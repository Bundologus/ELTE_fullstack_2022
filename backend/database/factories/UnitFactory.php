<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Country;
use App\Models\City;
use App\Models\District;
use Carbon\CarbonInterval;

class UnitFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */

    private $street_types_enum = array('Ave', 'Blvd', 'Crt', 'Cres', 'Dr', 'Pl', 'Rd', 'Sq', 'Stn', 'St', 'Terr');

    public function definition() {
        $nameLength = rand(1, 3);

        $address = rand(1, 150) . ' ' . $this->faker->word() . ' ' . array_rand($this->street_types_enum) . '. ';

        $time_step_hours = rand(0, 2);
        $time_step_minutes = ($time_step_hours == 0) ? 30 : rand(0, 1) * 30;
        $time_step = CarbonInterval::createFromDateString("{$time_step_hours} hours {$time_step_minutes} minutes");
        $min_time = CarbonInterval::instance($time_step);
        $max_time = CarbonInterval::instance($time_step);
        $min_time->multiply(rand(0, 2));
        $max_time->multiply(rand(2, 4));

        return [
            'name' => $this->faker->words($nameLength, true),
            'owner_id' => User::all()->random()->id,
            'country_id' => Country::all()->random()->id,
            'city_id' => City::all()->random()->id,
            'district_id' => (rand(0, 1) == 1) ? District::all()->random()->id : null,
            'street_address' => $address,
            'description' => $this->faker->paragraph(rand(4, 6)),
            'reservation_terms' => $this->faker->paragraph(rand(4, 6)),
            'default_min_time' => $min_time,
            'default_max_time' => $max_time,
            'default_time_step' => $time_step,
        ];
    }
}
