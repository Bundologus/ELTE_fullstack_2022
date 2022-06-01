<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use App\Http\Resources\OpeningHoursResource;
use App\Models\OpeningHours;
use App\Models\Reservable;
use App\Models\Unit;
use Illuminate\Http\Request;

class OpeningHoursController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $query = $request->query();

        if ($query == null) {
            return OpeningHoursResource::collection(OpeningHours::all()->keyBy->id);
        }

        $whereClause = [];
        foreach ($query as $key => $value) {
            array_push($whereClause, [$key, "=", $value]);
        }

        $ohs = OpeningHours::where($whereClause)->get()->keyBy->id;
        return OpeningHoursResource::collection($ohs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $data = $request->all();
        $unit = array_key_exists('unit_id', $data) ? Unit::find($data['unit_id']) : null;
        $reservable = array_key_exists('reservable_id', $data) ? Reservable::find($data['reservable_id']) : null;

        if ($unit != null or $reservable != null) {
            $new_oh = OpeningHours::create([
                'unit_id' => array_key_exists('unit_id', $data) ? $data['unit_id'] : null,
                'reservable_id' => array_key_exists('reservable_id', $data) ? $data['reservable_id'] : null,
                'day_from' => array_key_exists('day_from', $data) ? $data['day_from'] : null,
                'day_to' => array_key_exists('day_to', $data) ? $data['day_to'] : null,
                'specific_date_from' => array_key_exists('day_to', $data) ? $data['specific_date_from'] : null,
                'specific_date_to' => array_key_exists('day_to', $data) ? $data['specific_date_to'] : null,
                'time_from' => array_key_exists('day_to', $data) ? $data['time_from'] : null,
                'time_to' => array_key_exists('day_to', $data) ? $data['time_to'] : null,
            ]);

            return new OpeningHoursResource($new_oh);
        }

        return abort(400, "Bad request.");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $oh = OpeningHours::find($id);

        if ($oh == null) {
            return abort(404, 'Resource not found.');
        }

        return new OpeningHoursResource($oh);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $data = $request->all();
        $oh = OpeningHours::find($id);

        if ($oh == null) {
            return abort(404, 'Resource not found.');
        }

        foreach ($data as $key => $value) {
            if ($key == 'unit_id') {
                $unit = Unit::find($value);
                if ($unit == null) {
                    return abort(404, 'Unit resource not found');
                }
            } else if ($key == 'reservable_id') {
                $reservable = Reservable::find($value);
                if ($reservable == null) {
                    return abort(404, 'Reservable resource not found');
                }
            }
            $oh[$key] = $value;
        }

        return new OpeningHoursResource($oh);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $oh = OpeningHours::find($id);

        if ($oh == null) {
            return abort(404, 'Resource not found.');
        }

        $oh->delete();

        return response('Success.', 200);
    }
}
