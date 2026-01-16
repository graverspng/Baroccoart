<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class OwnerPasswordLockTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_change_password_once_and_it_locks_after(): void
    {
        $owner = User::factory()->create([
            'password' => Hash::make('OldPassword123!'),
            'is_owner' => true,
            'password_locked_at' => null,
        ]);

        $response = $this->actingAs($owner)->put(route('password.update'), [
            'current_password' => 'OldPassword123!',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

        $response->assertSessionHasNoErrors();

        $owner->refresh();
        $this->assertNotNull($owner->password_locked_at);
        $this->assertTrue(Hash::check('NewPassword123!', $owner->password));
    }

    public function test_owner_cannot_change_password_after_it_is_locked(): void
    {
        $owner = User::factory()->create([
            'password' => Hash::make('OldPassword123!'),
            'is_owner' => true,
            'password_locked_at' => now(),
        ]);

        $response = $this->actingAs($owner)->put(route('password.update'), [
            'current_password' => 'OldPassword123!',
            'password' => 'AnotherPassword123!',
            'password_confirmation' => 'AnotherPassword123!',
        ]);

        $response->assertSessionHasErrors();

        $owner->refresh();
        $this->assertTrue(Hash::check('OldPassword123!', $owner->password));
        $this->assertNotNull($owner->password_locked_at);
    }
}
