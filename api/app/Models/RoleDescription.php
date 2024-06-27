<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoleDescription extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "role_descriptions";
    protected $primaryKey = "id";

    protected $fillable = [
        'description',
        'languageId',
        'roleId',
    ];
}
