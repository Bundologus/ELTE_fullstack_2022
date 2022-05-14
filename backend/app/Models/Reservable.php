<?php

namespace App\Models;

use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservable extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'min_spaces',
        'max_spaces',
        'min_time',
        'max_time',
        'time_step',
    ];

    public function fpEntity() {
        return $this->hasOne(FpEntity::class);
    }

    public function reservation() {
        return $this->hasMany(Reservation::class);
    }

    public function openingHours() {
        return $this->hasMany(OpeningHours::class);
    }

    public function getMinTimeAttribute($value) {
        if (!$value) {
            return $this->fpEntity->floorPlan->unit->default_min_time;
        }

        return CarbonInterval::createFromDateString($value);
    }

    public function getMaxTimeAttribute($value) {
        if (!$value) {
            return $this->fpEntity->floorPlan->unit->default_max_time;
        }

        return CarbonInterval::createFromDateString($value);
    }

    public function getTimeStepAttribute($value) {
        if (!$value) {
            return $this->fpEntity->floorPlan->unit->default_time_step;
        }

        return CarbonInterval::createFromDateString($value);
    }
}
