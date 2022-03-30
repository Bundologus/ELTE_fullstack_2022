<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'country_id',
        'city_id',
        'district_id',
        'street_address',
        'description',
        'profile_picture',
        'reservation_terms',
        'default_min_time',
        'default_max_time',
        'default_time_step',
    ];
}
