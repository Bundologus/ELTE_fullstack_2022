<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('countries')->insert([
            'name' => 'Hungary'
        ]);
        $hungary = Country::where('name', 'Hungary')->first();
        DB::table('cities')->insert([
            'country_id' => $hungary->id,
            'name' => 'Budapest',
        ]);
        $budapest = City::where('name', 'Budapest')->first();

        $districts = array(
            'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII'
        );
        foreach ($districts as $key => $district) {
            DB::table('districts')->insert([
                'city_id' => $budapest->id,
                'name' => $district,
                'post_code' => ($key + 1 < 10 ? '10' : '1') . ($key + 1) . '1',
            ]);
        }
    }
}
