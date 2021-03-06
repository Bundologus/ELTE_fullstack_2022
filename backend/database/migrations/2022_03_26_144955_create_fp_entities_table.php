<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFpEntitiesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('fp_entities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('floor_plan_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('type');
            $table->text('data');
            $table->text('vertices');
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
        Schema::dropIfExists('fp_entities');
    }
}
