<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FpEntityFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */

    static $type_enum = array(
        "none",
        "wall",
        "door",
        "window",
        "table",
        "chair",
        "misc",
    );

    public function definition() {
        // TODO add frontend specific field generators

        return [
            'type' => array_rand(self::$type_enum),
            'data' => "",
            'vertices' => "",
        ];
    }
}
