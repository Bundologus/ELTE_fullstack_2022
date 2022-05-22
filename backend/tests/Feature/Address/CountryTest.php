<?php

namespace Tests\Feature\Address;

use App\Models\Country;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class CountryTest extends TestCase {
    use RefreshDatabase;

    // post method
    public function test_guest_can_not_post_country() {
        $response = $this->post(
            'api/country',
            ['name' => 'test country']
        );

        $this->assertGuest();
        $response->assertStatus(403);
    }

    public function test_user_can_not_post_country() {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post('api/country', ['name' => 'test country']);

        $this->assertAuthenticated();
        $response->assertStatus(403);
    }

    public function test_admin_can_post_country() {
        $admin = User::factory()->state(['admin' => 1])->create();

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->post('api/country', ['name' => 'test country']);

        $response->assertStatus(201);
    }

    // read all method
    public function test_guest_can_get_country_list() {
        Country::factory(10)->create();
        $response = $this->get('api/country');

        $this->assertGuest();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data', 10)
                    ->etc()
            );
    }

    public function test_user_can_get_country_list() {
        $user = User::factory()->create();
        Country::factory(10)->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get('api/country');

        $this->assertAuthenticated();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data', 10)
                    ->etc()
            );
    }

    public function test_admin_can_get_country_list() {
        $admin = User::factory()->state(['admin' => 1])->create();
        Country::factory(10)->create();

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->get('api/country');

        $this->assertAuthenticated();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data', 10)
                    ->etc()
            );
    }

    // read one method
    public function test_guest_can_get_country_by_id() {
        $country = Country::factory()->create();
        $response = $this->get('api/country/' . $country->id);

        $this->assertGuest();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $country->id)
                    ->where('data.name', $country->name)
            );
    }

    public function test_user_can_get_country_by_id() {
        $user = User::factory()->create();
        $country = Country::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get('api/country/' . $country->id);

        $this->assertAuthenticated();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $country->id)
                    ->where('data.name', $country->name)
            );
    }

    public function test_admin_can_get_country_by_id() {
        $admin = User::factory()->state(['admin' => 1])->create();
        $country = Country::factory()->create();

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->get('api/country/' . $country->id);

        $this->assertAuthenticated();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $country->id)
                    ->where('data.name', $country->name)
            );
    }

    // update method
    public function test_guest_can_not_update_country_by_id() {
        $country = Country::factory()->create();
        $response = $this->putJson(
            'api/country/' . $country->id,
            ['name' => $country->name . ' modified',]
        );

        $this->assertGuest();
        $response->assertStatus(403);
    }

    public function test_user_can_not_update_country_by_id() {
        $user = User::factory()->create();
        $country = Country::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->putJson(
                'api/country/' . $country->id,
                ['name' => $country->name . ' modified',]
            );

        $this->assertAuthenticated();
        $response->assertStatus(403);
    }

    public function test_admin_can_update_country_by_id() {
        $admin = User::factory()->state(['admin' => 1])->create();
        $country = Country::factory()->create();
        $new_name = $country->name . ' modified';

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->putJson(
                'api/country/' . $country->id,
                ['name' => $new_name,]
            );

        $this->assertAuthenticated();
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $country->id)
                    ->where('data.name', $new_name)
            );
    }

    // delete method
    public function test_guest_can_not_delete_country_by_id() {
        $country = Country::factory()->create();
        $response = $this->delete('api/country/' . $country->id);

        $this->assertGuest();
        $response->assertStatus(403);
    }

    public function test_user_can_not_delete_country_by_id() {
        $user = User::factory()->create();
        $country = Country::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->delete('api/country/' . $country->id);

        $this->assertAuthenticated();
        $response->assertStatus(403);
    }

    public function test_admin_can_update_delete_by_id() {
        $admin = User::factory()->state(['admin' => 1])->create();
        $country = Country::factory()->create();

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->delete('api/country/' . $country->id);

        $this->assertAuthenticated();
        $response->assertStatus(200);

        $response = $this->actingAs($admin)
            ->withSession(['banned' => false])
            ->get('api/country/' . $country->id);

        $response->assertStatus(404);
    }
}
