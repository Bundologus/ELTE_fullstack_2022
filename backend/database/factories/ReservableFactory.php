<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\CarbonInterval;

class ReservableFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $min = rand(1, 10);
        $max = $min + rand(0, 5);

        $time_step_hours = rand(0, 2);
        $time_step_minutes = ($time_step_hours == 0) ? 30 : rand(0, 1) * 30;
        $time_step = CarbonInterval::createFromDateString("{$time_step_hours} hours {$time_step_minutes} minutes");
        $min_time = CarbonInterval::instance($time_step);
        $max_time = CarbonInterval::instance($time_step);

        return [
            'name' => $this->faker->word(),
            'min_spaces' => $min,
            'max_spaces' => $max,
            'min_time' => $min_time,
            'max_time' => $max_time,
            'time_step' => $time_step
        ];
    }
}
