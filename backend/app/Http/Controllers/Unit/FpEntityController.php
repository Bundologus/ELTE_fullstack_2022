<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use App\Http\Resources\FpEntityResource;
use App\Models\FloorPlan;
use App\Models\FpEntity;
use Illuminate\Http\Request;

class FpEntityController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @param  int  $unit_id
     * @return \Illuminate\Http\Response
     */
    public function list($unit_id) {
        $floorPlan = FloorPlan::where('unit_id', '=', $unit_id)->getFirst();

        if ($floorPlan == null) {
            return abort(404, 'Resource not found.');
        }

        return FpEntityResource::collection($floorPlan->entities);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $unit_id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $unit_id) {
        $data = $request->all();
        $floorPlan = FloorPlan::where('unit_id', '=', $unit_id)->getFirst();

        if ($floorPlan == null) {
            return abort(404, 'Resource not found.');
        }
        if (array_key_exists('parent_id', $data)) {
            $parent = FpEntity::find('parent_id');
            if (!$parent) {
                return abort(404, 'Resource not found.');
            }
        }

        $new_fpEntity = FpEntity::create([
            'floor_plan_id' => $floorPlan->id,
            'type' => $data['type'],
            'custom_fp_data' => $data['custom_fp_data'],
            'custom_user_data' => $data['custom_user_data'],
            'vertices' => $data['vertices'],
            'parent_id' => array_key_exists('parent_id', $data) ? $data['parent_id'] : null,
        ]);

        return new FpEntityResource($new_fpEntity);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $unit_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($unit_id, $id) {
        $fpEntity = FpEntity::find($id);

        if (!$fpEntity) {
            return abort(404, 'Resource not found.');
        }

        return new FpEntityResource($fpEntity);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $unit_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $unit_id, $id) {
        $data = $request->all();
        $fpEntity = FpEntity::find($id);

        if (!$fpEntity) {
            return abort(404, 'Resource not found.');
        }

        foreach ($data as $key => $value) {
            if ($key == 'parent_id') {
                $parent = FpEntity::find($value);
                if (!$parent) {
                    return abort(404, 'Resource not found.');
                }
            }
            $fpEntity[$key] = $value;
        }
        $fpEntity->save();

        return new FpEntityResource($fpEntity);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $unit_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($unit_id, $id) {
        $fpEntity = FpEntity::find($id);

        if (!$fpEntity) {
            return abort(404, 'Resource not found.');
        }

        $fpEntity->delete();

        return response('Success.', 200);
    }
}
