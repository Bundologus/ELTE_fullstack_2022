<?php

namespace Database\Factories;

use App\Models\FloorPlan;
use App\Models\Reservable;
use Illuminate\Database\Eloquent\Factories\Factory;

class FpEntityFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'reservable_id' => Reservable::all()->random()->id,
            'floor_plan_id' => FloorPlan::all()->random()->id,
            'type' => $this->faker->word(),
        ];
    }
}
