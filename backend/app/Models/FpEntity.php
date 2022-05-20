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
        'custom_fp_data',
        'custom_user_data',
        'vertices',
        'parent_id',
    ];

    public function reservable() {
        return $this->hasOne(Reservable::class);
    }

    public function floorPlan() {
        return $this->belongsTo(FloorPlan::class);
    }

    public function parent() {
        return $this->belongsTo(FpEntity::class, 'parent_id');
    }

    public function children() {
        return $this->hasMany(FpEntity::class);
    }
}
