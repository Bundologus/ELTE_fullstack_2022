<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Country;
use App\Models\User;
use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */

    static $street_types_enum = array('Ave', 'Blvd', 'Crt', 'Cres', 'Dr', 'Pl', 'Rd', 'Sq', 'Stn', 'St', 'Terr');

    public function definition() {
        $nameLength = rand(1, 3);

        $address = rand(1, 150) . ' ' . ucwords($this->faker->words(rand(1, 2), true)) . ' ' . self::$street_types_enum[array_rand(self::$street_types_enum)] . '.';

        $time_step_hours = rand(0, 2);
        $time_step_minutes = ($time_step_hours == 0) ? 30 : rand(0, 1) * 30;
        $time_step = CarbonInterval::createFromDateString("{$time_step_hours} hours {$time_step_minutes} minutes");
        $min_time = CarbonInterval::instance($time_step);
        $max_time = CarbonInterval::instance($time_step);
        $min_time->multiply(rand(0, 2));
        $max_time->multiply(rand(2, 4));

        //$country_id = Country::all()->random()->id;
        //$city = City::where('country_id', $country_id)->get()->random();
        //$city_id = $city->id;
        //$district_id = $city->districts->count() > 0 ? $city->districts->random()->id : null;

        return [
            'name' => ucwords($this->faker->words($nameLength, true)),
            'owner_id' => User::where('admin', 0)->get()->random()->id,
            /* 'country_id' => $country_id,
            'city_id' => $city_id,
            'district_id' => $district_id, */
            'street_address' => $address,
            'description' => $this->faker->paragraph(rand(4, 6)),
            'reservation_terms' => $this->faker->paragraph(rand(4, 6)),
            'default_min_time' => $min_time,
            'default_max_time' => $max_time,
            'default_time_step' => $time_step,
        ];
    }
}
