<?php

use App\Http\Controllers\Address\CityController;
use App\Http\Controllers\Address\CountryController;
use App\Http\Controllers\Address\DistrictController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Unit\FloorPlanController;
use App\Http\Controllers\Unit\FpEntityController;
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

/**
 * 
 */

Route::middleware(['auth:sanctum'])->get('user', function (Request $request) {
    return $request->user();
});

/**
 * Address routes
 */

Route::controller(CountryController::class)->group(function () {
    Route::post('country', 'store')->middleware('auth:sanctum');
    Route::get('country', 'list');
    Route::get('country/{id}', 'show');
    Route::put('country/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('country/{id}', 'destroy')->middleware('auth:sanctum');
});

Route::controller(CityController::class)->group(function () {
    Route::post('city', 'store')->middleware('auth:sanctum');
    Route::get('city', 'list');
    Route::get('city/{id}', 'show');
    Route::put('city/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('city/{id}', 'destroy')->middleware('auth:sanctum');
});

Route::controller(DistrictController::class)->group(function () {
    Route::post('district', 'store')->middleware('auth:sanctum');
    Route::get('district', 'list');
    Route::get('district/{id}', 'show');
    Route::put('district/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('district/{id}', 'destroy')->middleware('auth:sanctum');
});


/**
 * Unit Routes
 */

Route::controller(UnitController::class)->group(function () {
    Route::post('unit', 'store')->middleware('auth:sanctum');
    Route::get('unit', 'list');
    Route::get('unit/{id}', 'show');
    Route::put('unit/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('unit/{id}', 'destroy')->middleware('auth:sanctum');
});

Route::controller(OpeningHoursController::class)->group(function () {
    Route::post('opening_hours', 'store')->middleware('auth:sanctum');
    Route::get('opening_hours', 'list');
    Route::get('opening_hours/{id}', 'show');
    Route::put('opening_hours/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('opening_hours/{id}', 'destroy')->middleware('auth:sanctum');
});

Route::controller(FloorPlanController::class)->group(function () {
    Route::post('unit/{id}/floor_plan', 'store')->middleware('auth:sanctum');
    Route::get('unit/{id}/floor_plan', 'show');
    Route::put('unit/{id}/floor_plan', 'update')->middleware('auth:sanctum');
    Route::delete('unit/{id}/floor_plan', 'destroy')->middleware('auth:sanctum');
});

Route::controller(FpEntityController::class)->group(function () {
    Route::post('unit/{unit_id}/floor_plan/entity', 'store')->middleware('auth:sanctum');
    Route::get('unit/{unit_id}/floor_plan/entity', 'list');
    Route::get('unit/{unit_id}/floor_plan/entity/{id}', 'show');
    Route::put('unit/{unit_id}/floor_plan/entity/{id}', 'update')->middleware('auth:sanctum');
    Route::delete('unit/{unit_id}/floor_plan/entity/{id}', 'destroy')->middleware('auth:sanctum');
});

Route::controller(ReservableController::class)->group(function () {
    Route::post('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'store')->middleware('auth:sanctum');
    Route::get('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'show');
    Route::put('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'update')->middleware('auth:sanctum');
    Route::delete('unit/{unit_id}/floor_plan/entity/{entity_id}/reservable', 'destroy')->middleware('auth:sanctum');
});


/**
 * Reservation routes
 */

Route::controller(ReservationController::class)->group(function () {
    Route::post('reservation', 'store')->middleware('auth:sanctum');
    Route::get('reservation', 'find')->middleware('auth:sanctum');
    Route::get('reservation/{id}', 'show')->middleware('auth:sanctum');
    Route::put('reservation/{id}', 'update')->middleware('auth:sanctum');
    Route::post('reservation/{id}/{action}', 'changeState')->middleware('auth:sanctum');
});
