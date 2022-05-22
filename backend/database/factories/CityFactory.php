<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $countries = Country::all();
        $country = $countries->count > 0
            ? $countries->random()
            : Country::factory()->create();

        return [
            'name' => $this->faker->city(),
            'country_id' => $country->id,
            'post_code' => $this->faker->regexify('[A-Z]{2}[0-9]{4}'),
        ];
    }
}
