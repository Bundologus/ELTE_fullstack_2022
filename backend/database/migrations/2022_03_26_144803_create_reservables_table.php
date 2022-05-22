<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservablesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('reservables', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('fp_entity_id')->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->integer('min_spaces');
            $table->integer('max_spaces');
            $table->time('min_time')->nullable();
            $table->time('max_time')->nullable();
            $table->time('time_step')->nullable();
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
        Schema::dropIfExists('reservables');
    }
}
