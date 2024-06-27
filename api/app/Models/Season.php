<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "seasons";
    protected $primaryKey = "id";

    protected $fillable = [
        'serieId',
        'title'
    ];

    public function serie()
    {
        return $this->belongsTo(Serie::class, 'serieId', 'id');
    }
    public function episodes()
    {
        return $this->hasMany(Episode::class, 'seasonId', 'id');
    }
}
