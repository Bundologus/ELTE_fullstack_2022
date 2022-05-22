<?php

namespace App\Models;

use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'owner_id',
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

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function admins() {
        return $this->belongsToMany(User::class);
    }

    public function openingHours() {
        return $this->hasMany(OpeningHours::class);
    }

    public function country() {
        return $this->belongsTo(Country::class);
    }

    public function city() {
        return $this->belongsTo(City::class);
    }

    public function district() {
        return $this->belongsTo(District::class)->withDefault([
            "name" => "",
            "post_code" => $this->city->post_code,
            "full_name" => $this->city->name,
        ]);
    }

    public function floorPlan() {
        return $this->hasOne(FloorPlan::class);
    }

    public function getDefaultMinTimeAttribute($value) {
        return CarbonInterval::createFromDateString($value);
    }

    public function getDefaultMaxTimeAttribute($value) {
        return CarbonInterval::createFromDateString($value);
    }

    public function getDefaultTimeStepAttribute($value) {
        return CarbonInterval::createFromDateString($value);
    }
}
