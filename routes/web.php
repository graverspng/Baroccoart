<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SiteSettingController;
use App\Models\Service;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $homeLayout = SiteSetting::where('key', 'home_layout')->value('value') ?: 'grid';
    if ($homeLayout === 'masonry') {
        $homeLayout = 'split';
    }
    if (! in_array($homeLayout, ['grid', 'split', 'featured', 'stacked'], true)) {
        $homeLayout = 'grid';
    }

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
        'homeLayout' => $homeLayout,
    ]);
});

Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('service.detail');
Route::patch('/services/{slug}', [ServiceController::class, 'update'])->middleware('auth')->name('service.update');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/contact', [ContactController::class, 'update'])->name('contact.update');
    Route::patch('/home-layout', [SiteSettingController::class, 'updateHomeLayout'])
        ->name('home.layout.update');
    Route::get('/owner-guide', function () {
        abort_unless(auth()->user()?->is_owner, 403);

        return Inertia::render('OwnerGuide');
    })->name('owner.guide');
});

require __DIR__.'/auth.php';
