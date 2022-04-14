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

    private $type_enum = array(
        "blocked",
        "wall",
        "door",
        "window",
        "table",
        "chair",
        "misc"
    );

    public function definition() {
        // TODO add frontend specific field generators

        return [
            'type' => array_rand($this->type_enum),
            'custom_fp_data' => "",
            'custom_user_data' => "",
            'vertices' => ""
        ];
    }
}
