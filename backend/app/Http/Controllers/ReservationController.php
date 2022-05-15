<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller {
    /**
     * Store a newly created Reservation.
     *
     * @param   \Illuminate\Http\Request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Show several Reservations with filters.
     *
     * @param   \Illuminate\Http\Request
     * @return  \Illuminate\Http\Response
     */
    public function find(Request $request) {
        //
    }

    /**
     * Show the specified Reservation.
     *
     * @param   int $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id) {
        $current_user_id = Auth::id();
        $reservation = Reservation::findOrFail($id);

        if ($reservation->user_id == $current_user_id) {
            return new ReservationResource($reservation);
        }
        return response('Reservation not found or user is forbidden to view.', 404);
    }

    /**
     * Update the specified Reservation.
     *
     * @param   \Illuminate\Http\Request
     * @param   int $id
     * @return  \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        # code...
    }

    /**
     * Update the state attribute of the specified Reservation.
     *
     * @param   int     $id
     * @param   string  $new_state
     * @return  \Illuminate\Http\Response
     */
    public function changeState($id, $action) {
        # code...
    }
}
