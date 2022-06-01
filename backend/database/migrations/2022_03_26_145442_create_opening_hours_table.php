<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningHoursTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('reservable_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('day_from')->nullable();
            $table->integer('day_to')->nullable();
            $table->date('specific_date_from')->nullable();
            $table->date('specific_date_to')->nullable();
            $table->time('time_from');
            $table->time('time_to');
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
        Schema::dropIfExists('opening_hours');
    }
}
