<?php

namespace Database\Factories;

use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservableFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $min = rand(1, 10);
        $max = $min + rand(0, 5);




        return [
            'name' => $this->faker->word(),
            'min_spaces' => $min,
            'max_spaces' => $max,
        ];
    }

    public function withTime() {
        return $this->state(function (array $attributes) {
            $time_step_hours = rand(0, 2);
            $time_step_minutes = ($time_step_hours == 0) ? 30 : rand(0, 1) * 30;
            $time_step = CarbonInterval::createFromDateString("{$time_step_hours} hours {$time_step_minutes} minutes");
            $min_time = CarbonInterval::instance($time_step);
            $max_steps = rand(1, 4);
            $max_time = CarbonInterval::instance($time_step);
            for ($i = 0; $i < $max_steps; $i++) {
                $max_time->add($time_step);
            }

            return [
                'min_time' => $min_time,
                'max_time' => $max_time,
                'time_step' => $time_step,
            ];
        });
    }
}
