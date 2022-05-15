<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
     * @param   \Illuminate\Http\Request
     * @param   int $id
     * @return  \Illuminate\Http\Response
     */
    public function show(Request $request, $id) {
        # code...
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
    public function setState($id, $new_state) {
        # code...
    }
}
