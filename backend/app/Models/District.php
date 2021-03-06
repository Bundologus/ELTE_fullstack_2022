<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model {
    use HasFactory;

    protected $fillable = [
        'city_id',
        'name',
        'post_code',
    ];

    public function city() {
        return $this->belongsTo(City::class);
    }

    public function units() {
        return $this->hasMany(Unit::class);
    }

    public function getPostCodeAttribute($value) {
        if (!$value) {
            return $this->city->post_code;
        }
        return $value;
    }
}
