<?php

namespace Database\Factories;

use App\Models\Reservable;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */

    static $states_enum = array("pending", "accepted", "rejected", "cancelled");

    public function definition() {
        $reservable = Reservable::all()->random();
        $time_step = $reservable->time_step;
        $min_time = $reservable->min_time;
        $max_time = $reservable->max_time;

        $start_time = Carbon::now()->addMonths(rand(0, 3) - 1)->addDays(rand(0, 30) - 10)->addHours(rand(0, 23) - 7)->addMinutes(rand(0, 59) - 20)->addSeconds(rand(0, 59) - 20);
        $steps = rand(1, 4);
        $reserved_time = CarbonInterval::instance($min_time);
        for ($i = 0; $i < $steps; $i++) {
            $reserved_time->add($time_step);
        }
        if ($reserved_time->greaterThan($max_time)) {
            CarbonInterval::instance($max_time);
        }
        $end_time = Carbon::instance($start_time)->add($reserved_time);



        return [
            'user_id' => User::all()->random()->id,
            'reservable_id' => $reservable->id,
            'created_at' => Carbon::now()->subMonths(rand(0, 3))->subDays(rand(0, 30))->subHours(rand(0, 23))->subMinutes(rand(0, 59))->subSeconds(rand(0, 59)),
            'start_time' => $start_time,
            'end_time' => $end_time,
            'status' => self::$states_enum[array_rand(self::$states_enum)],
        ];
    }
}
