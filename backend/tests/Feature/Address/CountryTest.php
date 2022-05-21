<?php

namespace Tests\Feature\Address;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CountryTest extends TestCase {
    use RefreshDatabase;

    public function test_guest_can_not_post_country() {
        $response = $this->post('api/country', ['name' => 'test country']);

        $this->assertGuest();
        $response->assertStatus(403);
    }

    public function test_user_can_not_post_country() {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->withSession(['banned' => false])->post('api/country', ['name' => 'test country']);

        $this->assertAuthenticated();
        $response->assertStatus(403);
    }

    public function test_admin_can_post_country() {
        $user = User::factory()->state(['admin' => 1])->create();

        $response = $this->actingAs($user)->withSession(['banned' => false])->post('api/country', ['name' => 'test country']);

        $response->assertStatus(201);
    }

    public function test_guest_can_get_country_list() {
        $response = $this->get('api/country');

        $this->assertGuest();
        $response->assertStatus(200);
    }
}
