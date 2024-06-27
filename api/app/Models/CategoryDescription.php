<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryDescription extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "category_descriptions";
    protected $primaryKey = "id";

    protected $fillable = [
        'description',
        'languageId',
        'categoryId',
    ];
}
