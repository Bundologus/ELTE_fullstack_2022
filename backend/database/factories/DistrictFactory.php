<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

class DistrictFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $cities = City::all();
        $city = $cities->count > 0
            ? $cities->random()
            : City::factory()->create();

        return [
            'name' => ucwords($this->faker->word()),
            'city_id' => $city->id,
            'post_code' => $this->faker->regexify('[A-Z]{2}[0-9]{4}'),
        ];
    }
}
