<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->onUpdate('cascade')->onDelete('restrict');
            $table->string('name');
            $table->foreignId('country_id')->constrained()->onUpdate('cascade')->onDelete('restrict');
            $table->foreignId('city_id')->constrained()->onUpdate('cascade')->onDelete('restrict');
            $table->foreignId('district_id')->nullable()->constrained()->onUpdate('cascade')->nullOnDelete();
            $table->string('street_address');
            $table->text('description');
            $table->string('profile_picture');
            $table->text('reservation_terms');
            $table->time('default_min_time');
            $table->time('default_max_time');
            $table->time('default_time_step');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('units');
    }
}
