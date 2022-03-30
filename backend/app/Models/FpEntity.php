<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FpEntity extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'reservable_id',
        'floor_plan_id',
        'type',
        'custom_fp_data',
        'custom_user_data',
        'vertices',
        'parent_id',
    ];
}
