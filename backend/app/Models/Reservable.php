<?php

namespace App\Models;

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
}
