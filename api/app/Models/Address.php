<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "addresses";
    protected $primaryKey = "id";

    protected $fillable = [
        'address',
        'postalCode',
        'state',
        'cityId',
        'userId'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'cityId', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
