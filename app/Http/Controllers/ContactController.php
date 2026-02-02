<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $contacts = Contact::where('slug', '!=', 'interjers-dizains')
            ->orderBy('id')
            ->get()
            ->map(function (Contact $contact) {
            return [
                'id' => $contact->id,
                'slug' => $contact->slug,
                'title' => $contact->title,
                'lead' => $contact->lead,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'tag' => $contact->tag,
                'photo' => $contact->photo,
            ];
        });

        return Inertia::render('Contact', [
            'contacts' => $contacts,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        abort_unless($user && $user->is_owner, 403);

        $validated = $request->validate([
            'contacts' => ['required', 'array'],
            'contacts.*.id' => ['required', 'integer', 'exists:contacts,id'],
            'contacts.*.title' => ['required', 'string', 'max:255'],
            'contacts.*.lead' => ['required', 'string', 'max:255'],
            'contacts.*.email' => ['required', 'email', 'max:255'],
            'contacts.*.phone' => ['required', 'string', 'max:255'],
            'contacts.*.tag' => ['nullable', 'string', 'max:255'],
            'photo_files' => ['array'],
            'photo_files.*' => ['image', 'max:5120'],
        ]);

        $photoFiles = $request->file('photo_files', []);

        foreach ($validated['contacts'] as $contactData) {
            $contact = Contact::findOrFail($contactData['id']);

            if (isset($photoFiles[$contact->id])) {
                $path = $photoFiles[$contact->id]->store('contact-photos', 'public');
                $contactData['photo'] = Storage::url($path);
            }

            $contact->update([
                'title' => $contactData['title'],
                'lead' => $contactData['lead'],
                'email' => $contactData['email'],
                'phone' => $contactData['phone'],
                'tag' => $contactData['tag'] ?? null,
                'photo' => $contactData['photo'] ?? $contact->photo,
            ]);
        }

        return back()->with('success', 'Kontakti atjaunoti.');
    }
}
