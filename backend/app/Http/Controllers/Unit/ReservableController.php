<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservableResource;
use App\Models\FpEntity;
use App\Models\Reservable;
use App\Models\Unit;
use Illuminate\Http\Request;

class ReservableController extends Controller {
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $unit_id
     * @param  int  $entity_id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $unit_id, $entity_id) {
        $data = $request->all();
        $unit = Unit::find($unit_id);
        $entity = FpEntity::find($entity_id);

        if (!$entity or !$unit) {
            return abort(404, 'Resource not found.');
        }

        $new_reservable = Reservable::create([
            'unit_id' => $unit_id,
            'name' => $data['name'],
            'min_spaces' => $data['min_spaces'],
            'max_spaces' => $data['max_spaces'],
            'min_time' => array_key_exists('min_time', $data) ? $data['min_time'] : null,
            'max_time' => array_key_exists('max_time', $data) ? $data['max_time'] : null,
            'time_step' => array_key_exists('time_step', $data) ? $data['time_step'] : null,
        ]);

        return new ReservableResource($new_reservable);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $unit_id
     * @param  int  $entity_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($unit_id, $entity_id, $id) {
        $reservable = Reservable::find($id);

        if (!$reservable) {
            return abort(404, 'Resource not found.');
        }

        return new ReservableResource($reservable);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $unit_id
     * @param  int  $entity_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $unit_id, $entity_id, $id) {
        $data = $request->all();
        $unit = Unit::find($unit_id);
        $reservable = Reservable::find($id);

        if (!$reservable or !$unit) {
            return abort(404, 'Resource not found.');
        }

        foreach ($data as $key => $value) {
            if ($key = 'entity_id') {
                $new_entity = FpEntity::find($value);
                if (!$new_entity) {
                    return abort(404, 'Resource not found.');
                }
            }
            $reservable[$key] = $value;
        }

        $reservable->save();

        return new ReservableResource($reservable);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $reservable = Reservable::find($id);

        if (!$reservable) {
            return abort(404, 'Resource not found.');
        }

        $reservable->delete();

        return response('Success.', 200);
    }
}
