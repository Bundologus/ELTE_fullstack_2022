<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class FloorPlanFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'unit_id' => Unit::all()->random()->id,
            'width' => rand(1200, 6000),
            'height' => rand(720, 2500),
        ];
    }
}
