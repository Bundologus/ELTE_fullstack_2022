<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reservable_id',
        'start_time',
        'end_time',
        'status',
    ];

    public function reservable() {
        return $this->belongsTo(Reservable::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
