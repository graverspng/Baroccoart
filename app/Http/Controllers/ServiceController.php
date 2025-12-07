<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        $service = Service::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'heading' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'hero_image' => ['nullable', 'url'],
            'images' => ['array'],
            'images.*' => ['url'],
        ]);

        $bodyLines = collect(explode("\n", $validated['body']))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();

        DB::transaction(function () use ($service, $validated, $bodyLines) {
            $service->update([
                'label' => $validated['label'],
                'heading' => $validated['heading'],
                'body' => $bodyLines,
                'hero_image' => $validated['hero_image'] ?? null,
            ]);

            if (array_key_exists('images', $validated)) {
                $service->images()->delete();
                foreach ($validated['images'] as $url) {
                    $service->images()->create(['url' => $url]);
                }
            }
        });

        return redirect()->back()->with('success', 'Pakalpojums atjaunots.');
    }
}
