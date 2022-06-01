<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FpEntity extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'floor_plan_id',
        'type',
        'data',
        'vertices',
    ];

    public function reservable() {
        return $this->hasOne(Reservable::class)->withDefault([
            "id" => -1,
        ]);
    }

    public function floorPlan() {
        return $this->belongsTo(FloorPlan::class);
    }
}
