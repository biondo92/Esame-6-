<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Serie extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "series";
    protected $primaryKey = "id";

    protected $fillable = [
        'categoryId',
        'title',
        'rating',
        'image'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

    public function seasons()
    {
        return $this->hasMany(Season::class, 'serieId', 'id');
    }
}
