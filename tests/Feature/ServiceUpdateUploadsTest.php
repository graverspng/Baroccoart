<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ServiceUpdateUploadsTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_upload_multiple_images_at_once(): void
    {
        Storage::fake('public');

        $owner = User::factory()->create();
        $owner->forceFill(['is_owner' => true])->save();

        $service = Service::create([
            'slug' => 'test-service',
            'label' => 'Test Service',
            'heading' => 'Test Heading',
            'body' => ['Line one'],
            'hero_image' => null,
        ]);

        $first = UploadedFile::fake()->image('first.jpg');
        $second = UploadedFile::fake()->image('second.jpg');

        $response = $this->actingAs($owner)->patch(route('service.update', $service->slug), [
            'label' => 'Test Service',
            'heading' => 'Test Heading',
            'body' => "Line one\nLine two",
            'hero_image' => null,
            'images' => [],
            'uploadFiles' => [$first, $second],
        ])->assertSessionDoesntHaveErrors();

        $response->assertRedirect(route('service.detail', $service->slug));

        $service->refresh();

        $this->assertCount(2, $service->images);

        foreach ($service->images as $image) {
            $storagePath = str_replace('/storage/', '', $image->url);
            Storage::disk('public')->assertExists($storagePath);
        }
    }

    public function test_owner_can_append_more_uploads_across_updates(): void
    {
        Storage::fake('public');

        $owner = User::factory()->create();
        $owner->forceFill(['is_owner' => true])->save();

        $service = Service::create([
            'slug' => 'test-service-two',
            'label' => 'Test Service',
            'heading' => 'Test Heading',
            'body' => ['Line one'],
            'hero_image' => null,
        ]);

        // First upload
        $this->actingAs($owner)->patch(route('service.update', $service->slug), [
            'label' => 'Test Service',
            'heading' => 'Test Heading',
            'body' => "Line one",
            'hero_image' => null,
            'images' => [],
            'uploadFiles' => [UploadedFile::fake()->image('first.jpg')],
        ])->assertSessionDoesntHaveErrors()->assertRedirect();

        $service->refresh();
        $this->assertCount(1, $service->images);

        $existingImages = $service->images()->pluck('url')->toArray();

        // Append two more uploads while keeping the existing one
        $this->actingAs($owner)->patch(route('service.update', $service->slug), [
            'label' => 'Test Service',
            'heading' => 'Test Heading',
            'body' => "Line one",
            'hero_image' => null,
            'images' => $existingImages,
            'uploadFiles' => [
                UploadedFile::fake()->image('second.jpg'),
                UploadedFile::fake()->image('third.jpg'),
            ],
        ])->assertSessionDoesntHaveErrors()->assertRedirect();

        $service->refresh();
        $this->assertCount(3, $service->images);
    }
}
