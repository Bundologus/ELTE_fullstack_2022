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
        $data = $request->all();
        $reservable = array_key_exists('reservable_id', $data) ? Reservable::find('reservable_id') : null;
        $user = array_key_exists('user_id', $data) ? User::find('user_id') : null;

        if (!$reservable or !$user) {
            return abort(404, 'Resource not found.');
        }

        $new_reservation = Reservation::create([
            'user_id' => $data['user_id'],
            'reservable_id' => $data['reservable_id'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'status' => 'pending',
        ]);

        return new ReservationResource($new_reservation);
    }

    /**
     * Show several Reservations with filters.
     *
     * @param   \Illuminate\Http\Request
     * @return  \Illuminate\Http\Response
     */
    public function find(Request $request) {
        $query = $request->query();

        if (!$query) {
            $active_user = Auth::user();
            return ReservationResource::collection($active_user->reservations);
        }

        $whereClause = [];
        foreach ($query as $key => $value) {
            if ($key == 'time_from') {
                array_push($whereClause, [$key, ">=", $value]);
            } else if ($key == 'time_to') {
                array_push($whereClause, [$key, "<=", $value]);
            } else if ($key == 'unit_id') {
                $unit_id_filter = $value;
            } else {
                array_push($whereClause, [$key, "=", $value]);
            }
        }

        return ReservationResource::collection(Reservation::where($whereClause)->get());
    }

    /**
     * Show the specified Reservation.
     *
     * @param   int $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id) {
        $current_user_id = Auth::id();
        $reservation = Reservation::find($id);

        if (!$reservation or $reservation->user_id != $current_user_id) {
            return abort(404, 'Reservation not found or user is forbidden to view.');
        }
        return new ReservationResource($reservation);
    }

    /**
     * Update the specified Reservation.
     *
     * @param   \Illuminate\Http\Request
     * @param   int $id
     * @return  \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $data = $request->all();
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return abort(404, 'Reservation not found or user is forbidden to view.');
        }

        if ($reservation->status == 'rejected' or $reservation->status == 'cancelled') {
            return abort(405, 'Change not allowed. Reservation is already rejected or cancelled.');
        }

        foreach ($data as $key => $value) {
            $reservation[$key] = $value;
        }

        $reservation->save();

        return  new ReservationResource($reservation);
    }

    /**
     * Update the state attribute of the specified Reservation.
     *
     * @param   int     $id
     * @param   string  $new_state
     * @return  \Illuminate\Http\Response
     */
    public function changeState($id, $action) {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return abort(404, 'Reservation not found or user is forbidden to view.');
        }

        if ($action == 'accept') {
            // TODO make status and user checks
            $reservation->status = 'accepted';
        } else if ($action == 'reject') {
            $reservation->status = 'rejected';
        } else if ($action == 'cancel') {
            $reservation->status = 'cancelled';
        }

        return new ReservationResource($reservation);
    }
}
