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
            $entity_count = rand(5, 10);
            $rootEntities = FpEntity::factory($entity_count)->for($floorPlan)->create();

            $entity_count = rand(3, 5);
            for ($i = 0; $i < $entity_count; $i++) {
                $parent = $rootEntities->random();
                FpEntity::factory()->for($floorPlan)->state(['parent_id' => $parent->id])->create();
            }

            $fpEntity = $rootEntities->random();
            Reservable::factory()->for($fpEntity)->create();

            $fpEntity = FpEntity::where([
                ['parent_id', '=', null],
                ['floor_plan_id', '=', $floorPlan->id]
            ])->get()->first();
            Reservable::factory()->withTime()->for($fpEntity)->create();

            $special_hours_count = rand(3, 7);
            OpeningHours::factory($special_hours_count)->specificDate()->for($unit)->create();
            OpeningHours::factory(5)->specificDate()->singleDay()->for($unit)->create();
        }
    }
}
