<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "categories";
    protected $primaryKey = "id";

    protected $fillable = [
        "description"
    ];

    public $description;

    public function films()
    {
        return $this->hasMany(Film::class, 'categoryId', 'id');
    }
    public function series()
    {
        return $this->hasMany(Serie::class, 'categoryId', 'id');
    }
}
