<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    protected $fillable = [
        'slug',
        'label',
        'heading',
        'body',
        'hero_image',
    ];

    protected $casts = [
        'body' => 'array',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ServiceImage::class);
    }
}
