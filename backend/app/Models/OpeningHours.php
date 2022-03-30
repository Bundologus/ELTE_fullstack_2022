<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OpeningHours extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'unit_id',
        'reservable_id',
        'day_from',
        'day_to',
        'specific_date_from',
        'specific_data_to',
        'time_from',
        'time_to',
    ];

    public function unit() {
        return $this->belongsTo(Unit::class);
    }

    public function reservable() {
        return $this->belongsTo(Reservable::class);
    }
}
