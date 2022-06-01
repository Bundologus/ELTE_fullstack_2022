<?php

namespace Tests\Feature;

use App\Models\FloorPlan;
use App\Models\FpEntity;
use App\Models\Reservable;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class UnitTest extends TestCase {
    use RefreshDatabase;

    public function test_guest_can_get_all_units() {
        User::factory()->create();
        $units = Unit::factory(3)->has(FloorPlan::factory())->create();
        foreach ($units as $unit) {
            $floorPlan = $unit->floorPlan;
            FpEntity::factory(7)->for($floorPlan)->create();
        }

        $response = $this->get('api/unit');

        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data', 3)
            );
    }

    public function test_quest_can_get_unit_by_id() {
        User::factory()->create();
        $unit = Unit::factory()->has(FloorPlan::factory())->create();
        $floorPlan = $unit->floorPlan;
        FpEntity::factory(7)->for($floorPlan)->create();

        $response = $this->get("api/unit/" . $unit->id);

        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $unit->id)
                    ->where('data.name', $unit->name)
            );
    }

    public function test_user_cannot_modify_unit() {
        $owner = User::factory()->create();
        $user = User::factory()->create();
        $unit = Unit::factory()->state(["owner_id" => $owner->id])->has(FloorPlan::factory())->create();
        $floorPlan = $unit->floorPlan;
        FpEntity::factory(7)->for($floorPlan)->create();

        $new_name = $unit->name . " modified";

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->put("api/unit/" . $unit->id, ["name" => $new_name]);

        $response->assertStatus(403);
    }

    public function test_owner_can_put_entities_in_batch() {
        $user = User::factory()->create();
        $unit = Unit::factory()->has(FloorPlan::factory())->create();
        $floorPlan = $unit->floorPlan;
        $oldPlainEntities = FpEntity::factory(7)->for($floorPlan)->create();
        $oldReservableEntities = FpEntity::factory(3)->for($floorPlan)->create();
        $reservables = [];
        foreach ($oldReservableEntities as $entity) {
            $reservable = Reservable::factory()->for($entity)->create();
            array_push($reservables, $reservable);
        }

        $newEntities = FpEntity::factory(10)->make();
        for ($i = 0; $i < 3; $i++) {
            $newEntities[$i]->reservable_id = $reservables[$i]->id;
        }

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->put('api/unit/' . $unit->id . '/floor_plan/entity', $newEntities->all());

        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data', 10)
            );
    }
}
