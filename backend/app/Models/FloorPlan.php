<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FloorPlan extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'unit_id',
        'width',
        'height',
    ];
}
