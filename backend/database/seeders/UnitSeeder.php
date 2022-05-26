<?php

namespace Database\Seeders;

use App\Models\FloorPlan;
use App\Models\FpEntity;
use App\Models\OpeningHours;
use App\Models\Reservable;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $units = Unit::factory(10)->has(FloorPlan::factory())->has(OpeningHours::factory())->create();

        foreach ($units as $unit) {
            $floorPlan = $unit->floorPlan;
            $entity_count = rand(7, 15);
            $rootEntities = FpEntity::factory($entity_count)->for($floorPlan)->create();

            $fpEntity = $rootEntities->random();
            Reservable::factory()->for($fpEntity)->create();

            $fpEntity = FpEntity::where(
                'floor_plan_id',
                '=',
                $floorPlan->id
            )->get()->first();
            Reservable::factory()->withTime()->for($fpEntity)->create();

            $special_hours_count = rand(3, 7);
            OpeningHours::factory($special_hours_count)->specificDate()->for($unit)->create();
            OpeningHours::factory(5)->specificDate()->singleDay()->for($unit)->create();
        }
    }
}
