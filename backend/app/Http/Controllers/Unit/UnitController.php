<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShortUnitResource;
use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UnitController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request   $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $query = $request->query();

        if ($query == null) {
            return UnitResource::collection(Unit::all()->keyBy->id);
        }
        $whereClause = [];
        $isCondensed = false;
        foreach ($query as $key => $value) {
            if ($key == "condensed") {
                $isCondensed = true;
            } else if ($key == "open_now") {
                // TODO filter by open now
            } else {
                array_push($whereClause, [$key, "=", $value]);
            }
        }
        $units = Unit::where($whereClause)->get()->keyBy->id;
        if ($isCondensed) {
            return ShortUnitResource::collection($units);
        }
        return UnitResource::collection($units);
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
        $hashName = '';

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $hashName = $file->hashName();
            Storage::disk('public')->put('images/units/' . $hashName, file_get_contents($file));
        }


        $new_unit = Unit::create([
            "owner_id" => $data["owner_id"],
            "name" => $data["name"],
            "country_id" => $data["country_id"],
            "city_id" => $data["city_id"],
            "district_id" => $data["district_id"],
            "description" => $data["description"],
            "profile_picture" => $hashName,
            "reservation_terms" => $data["reservation_terms"],
            "default_min_time" => $data["default_min_time"], // TODO agree on format
            "defaul_max_time" => $data["defaul_max_time"],
            "default_time_step" => $data["default_time_step"],
        ]);

        return new UnitResource($new_unit);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id) {
        $unit = Unit::find($id);

        if ($unit == null) {
            return abort(404, 'Resource not found.');
        }

        if ($request->query("full")) {
            return new UnitResource($unit);
        }
        return new ShortUnitResource($unit);
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
        $unit = Unit::find($id);
        $deleted_image_path = '';

        if ($unit == null) {
            return abort(404, 'Resource not found');
        }

        foreach ($data as $key => $value) {
            if ($key == "profile_picture") {
                $pubDisk = Storage::disk('public');
                $file = $request->file('profile_picture');
                $hashName = $file->hashName();
                $pubDisk->put('images/units/' . $hashName, file_get_contents($file));

                if ($unit->profile_picture != '' and $pubDisk->exists('images/units/' . $unit->profile_picture)) {
                    $deleted_image_path = 'images/units/' . $unit->profile_picture;
                }

                $unit[$key] = $hashName;
            } else {
                $unit[$key] = $value;
            }
        }
        $unit->save();

        if ($deleted_image_path != '') {
            Storage::disk('public')->delete($deleted_image_path);
        }

        return new UnitResource($unit);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $unit = Unit::find($id);

        if ($unit == null) {
            return abort(404, 'Resource not found');
        }

        $unit->delete();

        return response('Success.', 200);
    }
}
