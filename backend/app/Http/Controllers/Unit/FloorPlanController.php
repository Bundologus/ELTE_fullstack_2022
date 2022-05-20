<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use App\Http\Resources\FloorPlanResource;
use App\Models\FloorPlan;
use App\Models\Unit;
use Illuminate\Http\Request;

class FloorPlanController extends Controller {
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $unit_id) {
        $data = $request->all();
        $unit = Unit::find($unit_id);

        if ($unit == null) {
            return abort(404, 'Unit resource not found.');
        } else if ($unit->floor_plan != null) {
            return abort(409, 'Conflict. Unit already has a floor plan.');
        }

        $floorPlan = FloorPlan::create([
            'unit_id' => $unit_id,
            'width' => $data['width'],
            'height' => $data['height'],
        ]);

        return new FloorPlanResource($floorPlan);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $unit_id
     * @return \Illuminate\Http\Response
     */
    public function show($unit_id) {
        $floorPlan = FloorPlan::where('unit_id', '=', $unit_id)->getFirst();

        if ($floorPlan == null) {
            return abort(404, 'Resource not found.');
        }

        return new FloorPlanResource($floorPlan);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $unit_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $unit_id) {
        $data = $request->all();
        $floorPlan = FloorPlan::where('unit_id', '=', $unit_id)->getFirst();

        if ($floorPlan == null) {
            return abort(404, 'Resource not found.');
        }

        foreach ($data as $key => $value) {
            $floorPlan[$key] = $value;
        }
        $floorPlan->save();

        return new FloorPlanResource($floorPlan);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $unit_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($unit_id) {
        $floorPlan = FloorPlan::where('unit_id', '=', $unit_id)->getFirst();

        if ($floorPlan == null) {
            return abort(404, 'Resource not found.');
        }

        $floorPlan->delete();

        return response('Success.', 200);
    }
}
