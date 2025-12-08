<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $services = Service::orderBy('id')
        ->take(4)
        ->get()
        ->map(function ($service) {
            $body = is_array($service->body) ? $service->body : [];
            $blurb = $body[0] ?? '';

            return [
                'slug' => $service->slug,
                'label' => $service->label,
                'blurb' => $blurb,
                'hero_image' => $service->hero_image,
            ];
        });

    return Inertia::render('Welcome', [
        'services' => $services,
    ]);
});

Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('service.detail');
Route::patch('/services/{slug}', [ServiceController::class, 'update'])->middleware('auth')->name('service.update');

Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
