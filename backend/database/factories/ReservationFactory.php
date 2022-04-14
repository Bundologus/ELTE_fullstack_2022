<?php

namespace Database\Factories;

use App\Models\Reservable;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    private $states_enum = array("pending", "accepted", "rejected", "cancelled");

    public function definition()
    {
        $reserveable = Reservable::all()->random();
        $time_step = $reserveable->time_step;
        if (! $time_step) {
            $time_step = $reserveable->fpEntity()->floorPlan()->unit()->time_step;
        }



        return [
            'user_id' => User::all()->random()->id,
            'reservable_id' => $reserveable->id,
            'created_at' => Carbon::now()->subMonths(rand(0,3))->subDays(rand(0,30))->subHours(rand(0,23))->subMinutes(rand(0,59))->subSeconds(rand(0,59)),
            'start_time' =>
            'end_time' =>
            'status' => array_rand($states_enum)
        ];
    }
}
