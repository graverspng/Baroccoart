<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('lead');
            $table->string('email');
            $table->string('phone');
            $table->string('tag')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });

        DB::table('contacts')->insert([
            [
                'slug' => 'interjers-dizains',
                'title' => 'Interjers, dizains',
                'lead' => 'Mareta Gitendorfa Lūse',
                'email' => 'mareta@baroccoart.lv',
                'phone' => '+371 2 921 9791',
                'tag' => 'gsm',
                'photo' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'arhitektura-projektesana',
                'title' => 'Arhitektūra, projektēšana',
                'lead' => 'Armands Lūsis',
                'email' => 'armands@baroccoart.lv',
                'phone' => '+371 2 949 4338',
                'tag' => 'gsm',
                'photo' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'birojs',
                'title' => 'Birojs',
                'lead' => 'Brīvības iela 137 Rīga, Latvija',
                'email' => 'barocco@baroccoart.lv',
                'phone' => '+371 26262626',
                'tag' => 'WhatsApp',
                'photo' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
