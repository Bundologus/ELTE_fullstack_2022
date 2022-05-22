<?php

use App\Http\Controllers\Address\CityController;
use App\Http\Controllers\Address\CountryController;
use App\Http\Controllers\Address\DistrictController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Unit\FloorPlanController;
use App\Http\Controllers\Unit\OpeningHoursController;
use App\Http\Controllers\Unit\ReservableController;
use App\Http\Controllers\Unit\UnitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('user', function (Request $request) {
    return $request->user();
});


/**
 * Address routes
 */

Route::controller(CountryController::class)->group(function () {
    Route::post('country', 'store')->middleware('auth.admin');
    Route::get('country', 'list');
    Route::get('country/{id}', 'show');
    Route::put('country/{id}', 'update')->middleware('auth.admin');
    Route::delete('country/{id}', 'destroy')->middleware('auth.admin');
});

Route::controller(CityController::class)->group(function () {
    Route::post('city', 'store');
    Route::get('city', 'list');
    Route::get('city/{id}', 'show');
    Route::put('city/{id}', 'update');
    Route::delete('city/{id}', 'destroy');
});

Route::controller(DistrictController::class)->group(function () {
    Route::post('district', 'store');
    Route::get('district', 'list');
    Route::get('district/{id}', 'show');
    Route::put('district/{id}', 'update');
    Route::delete('district/{id}', 'destroy');
});


/**
 * Unit Routes
 */

Route::controller(UnitController::class)->group(function () {
    Route::post('unit', 'store');
    Route::get('unit', 'list');
    Route::get('unit/{id}', 'show');
    Route::put('unit/{id}', 'update');
    Route::delete('unit/{id}', 'destroy');
});

Route::controller(OpeningHoursController::class)->group(function () {
    Route::post('opening_hours', 'store');
    Route::get('opening_hours', 'list');
    Route::get('opening_hours/{id}', 'show');
    Route::put('opening_hours/{id}', 'update');
    Route::delete('opening_hours/{id}', 'destroy');
});

Route::controller(FloorPlanController::class)->group(function () {
    Route::post('unit/{id}/floor_plan', 'store');
    Route::get('unit/{id}/floor_plan', 'show');
    Route::put('unit/{id}/floor_plan', 'update');
    Route::delete('unit/{id}/floor_plan', 'destroy');
});

Route::controller(FpEntityController::class)->group(function () {
    Route::post('unit/{unit_id}/floor_plan/entity', 'store');
    Route::get('unit/{unit_id}/floor_plan/entity', 'list');
    Route::get('unit/{unit_id}/floor_plan/entity/{id}', 'show');
    Route::put('unit/{unit_id}/floor_plan/entity/{id}', 'update');
    Route::delete('unit/{unit_id}/floor_plan/entity/{id}', 'destroy');
});

Route::controller(ReservableController::class)->group(function () {
    Route::post('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'store');
    Route::get('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'show');
    Route::put('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'update');
    Route::delete('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'destroy');
});


/**
 * Reservation routes
 */

Route::controller(ReservationController::class)->group(function () {
    Route::post('reservation', 'store');
    Route::get('reservation', 'find');
    Route::get('reservation/{id}', 'show')->middleware(['auth:sanctum']);
    Route::put('reservation/{id}', 'update');
    Route::post('reservation/{id}/{action}', 'changeState');
});
