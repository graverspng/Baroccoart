<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Seed a default owner account.
     */
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        DB::table('users')->updateOrInsert(
            ['email' => 'admin@baroccoart.lv'],
            [
                'name' => 'Admin',
                'email_verified_at' => now(),
                'password' => Hash::make('Parole123!'),
                'is_owner' => true,
            ],
        );
    }

    /**
     * Remove the seeded owner account.
     */
    public function down(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        DB::table('users')
            ->where('email', 'admin@baroccoart.lv')
            ->delete();
    }
};
