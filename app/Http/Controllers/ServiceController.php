<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('images')
            ->orderBy('id')
            ->get()
            ->map(function ($service) {
                return [
                    'slug' => $service->slug,
                    'label' => $service->label,
                    'heading' => $service->heading,
                    'body' => $service->body,
                    'hero_image' => $service->hero_image,
                ];
            });

        return Inertia::render('Services', [
            'services' => $services,
        ]);
    }

    public function show(string $slug)
    {
        $service = Service::with('images')->where('slug', $slug)->firstOrFail();

        return Inertia::render('ServiceDetail', [
            'service' => [
                'slug' => $service->slug,
                'label' => $service->label,
                'heading' => $service->heading,
                'body' => $service->body,
                'hero_image' => $service->hero_image,
                'images' => $service->images->pluck('url')->values(),
            ],
        ]);
    }

    public function update(Request $request, string $slug)
    {
        $user = $request->user();
        abort_unless($user && $user->is_owner, 403);

        $cleanImages = collect($request->input('images', []))
            ->filter(fn ($url) => is_string($url) && $url !== '' && ! str_starts_with($url, 'blob:'))
            ->values()
            ->all();

        $heroImageInput = $request->filled('hero_image') ? $request->hero_image : null;
        if ($heroImageInput && str_starts_with($heroImageInput, 'blob:')) {
            $heroImageInput = null;
        }

        $request->merge([
            'hero_image' => $heroImageInput,
            'images' => $cleanImages,
        ]);

        $service = Service::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'heading' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'hero_image' => ['nullable', 'url'],
            'hero_file' => ['nullable', 'image', 'max:5120'],
            'images' => ['array'],
            'images.*' => ['url'],
            'uploadFiles' => ['array'],
            'uploadFiles.*' => ['nullable', 'image', 'max:5120'],
        ]);

        $bodyLines = collect(explode("\n", $validated['body']))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();

        $images = $validated['images'] ?? [];
        $uploadedFiles = collect(Arr::wrap($request->file('uploadFiles', [])))
            ->flatten()
            ->filter()
            ->all();

        if (! empty($uploadedFiles)) {
            foreach ($uploadedFiles as $file) {
                $path = $file->store('service-images', 'public');
                $images[] = Storage::url($path);
            }
        }

        DB::transaction(function () use ($service, $validated, $bodyLines, $images, $request) {
            $heroImage = $validated['hero_image'] ?? $service->hero_image;
            if ($request->file('hero_file')) {
                $heroImage = Storage::url($request->file('hero_file')->store('service-images', 'public'));
                $images[] = $heroImage;
            }
            if (! $heroImage && count($images)) {
                $heroImage = $images[0];
            }

            $service->update([
                'label' => $validated['label'],
                'heading' => $validated['heading'],
                'body' => $bodyLines,
                'hero_image' => $heroImage,
            ]);

            if ($images !== null) {
                $service->images()->delete();
                foreach ($images as $url) {
                    $service->images()->create(['url' => $url]);
                }
            }
        });

        return redirect()->route('service.detail', $slug)->with('success', 'Pakalpojums atjaunots.');
    }
}
