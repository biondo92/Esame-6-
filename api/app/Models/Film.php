<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Film extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "films";
    protected $primaryKey = "id";

    protected $fillable = [
        'categoryId',
        'title',
        'duration',
        'rating',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }
}
