<?php

namespace Database\Seeders;

use App\Models\FloorPlan;
use App\Models\FpEntity;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $units = Unit::factory(10)->has(FloorPlan::factory(1))->create();

        foreach ($units as $unit) {
            $floorPlan = $unit->floorPlan;
            $entity_count = rand(5, 10);
            FpEntity::factory($entity_count)->for($floorPlan)->create();

            $entity_count = rand(3, 5);
            FpEntity::factory($entity_count)->for($floorPlan)->forReservable()->create();
        }
    }
}
