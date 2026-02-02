<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::table('contacts')
            ->where('slug', 'interjers-dizains')
            ->delete();
    }

    public function down(): void
    {
        $exists = DB::table('contacts')
            ->where('slug', 'interjers-dizains')
            ->exists();

        if ($exists) {
            return;
        }

        DB::table('contacts')->insert([
            'slug' => 'interjers-dizains',
            'title' => 'Interjers, dizains',
            'lead' => 'Mareta Gitendorfa Lūse',
            'email' => 'mareta@baroccoart.lv',
            'phone' => '+371 2 921 9791',
            'tag' => 'gsm',
            'photo' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
};
