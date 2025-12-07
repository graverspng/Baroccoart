<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('label');
            $table->string('heading');
            $table->json('body');
            $table->string('hero_image')->nullable();
            $table->timestamps();
        });

        Schema::create('service_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('url');
            $table->timestamps();
        });

        $default = [
            [
                'slug' => 'celtnieciba',
                'label' => 'Celtniecība',
                'heading' => 'Arhitektūra, projektēšana',
                'body' => [
                    'Pilns projektēšanas pakalpojumu serviss. Arhitektūras daļa, ģenplāna daļa, būvkonstrukcijas, inženiertehniskie tīkli. Autoruzraudzība.',
                    'Dzīvojamās ēkas – daudzdzīvokļu nami, privātmājas.',
                    'Sabiedriskās ēkas – ofisi, darījumu ēkas, tirdzniecības ēkas, ražošanas būves.',
                    'Apbūves priekšlikumi – izstrādājam apbūves priekšlikumus saskaņā ar jūsu ieceri vai biznesa plānu. Izstrādājam koncepciju un pārskatāmu vizuālo informāciju. Sagatavojam tehnisko dokumentāciju iesniegšanai būvvaldē kā arī dokumentāciju bankas finansējuma saņemšanai.',
                    'Projektu saskaņošana – skiču, tehnisko projektu saskaņošana Rīgas un Latvijas būvvaldēs.',
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'slug' => 'projektesana',
                'label' => 'Projektēšana',
                'heading' => 'Arhitektūra, projektēšana',
                'body' => [
                    'Pilns projektēšanas pakalpojumu serviss. Arhitektūras daļa, ģenplāna daļa, būvkonstrukcijas, inženiertehniskie tīkli. Autoruzraudzība.',
                    'Dzīvojamās ēkas – daudzdzīvokļu nami, privātmājas.',
                    'Sabiedriskās ēkas – ofisi, darījumu ēkas, tirdzniecības ēkas, ražošanas būves.',
                    'Apbūves priekšlikumi – izstrādājam apbūves priekšlikumus saskaņā ar jūsu ieceri vai biznesa plānu. Izstrādājam koncepciju un pārskatāmu vizuālo informāciju. Sagatavojam tehnisko dokumentāciju iesniegšanai būvvaldē kā arī dokumentāciju bankas finansējuma saņemšanai.',
                    'Projektu saskaņošana – skiču, tehnisko projektu saskaņošana Rīgas un Latvijas būvvaldēs.',
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1494548162494-384bba4ab999?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'slug' => 'interjera-dizains',
                'label' => 'Interjera dizains',
                'heading' => 'Interjera projekti',
                'body' => [
                    'Izstrādājam pilnu interjera projektu saskaņā ar klienta vēlmēm. Projektiem nodrošinām autoruzraudzību.',
                    'Konsultācijas – sniedzam profesionālas konsultācijas par jebkuru jautājumu, kas saistīts ar jūsu mājokļa vai darba vides iekārtošanu.',
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'slug' => 'mebeles',
                'label' => 'Mēbeles',
                'heading' => 'Mēbeles',
                'body' => [
                    'Pielāgoti mēbeļu risinājumi, kas iederas telpas arhitektūrā un akcentē materiālu kvalitāti.',
                    'Speciālistu komanda palīdz no idejas līdz uzstādīšanai.',
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
        ];

        foreach ($default as $service) {
            $id = DB::table('services')->insertGetId([
                'slug' => $service['slug'],
                'label' => $service['label'],
                'heading' => $service['heading'],
                'body' => json_encode($service['body']),
                'hero_image' => $service['hero_image'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($service['images'] as $url) {
                DB::table('service_images')->insert([
                    'service_id' => $id,
                    'url' => $url,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('service_images');
        Schema::dropIfExists('services');
    }
};
