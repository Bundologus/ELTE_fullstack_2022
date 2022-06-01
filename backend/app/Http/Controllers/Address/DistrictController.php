<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use App\Http\Resources\DistrictResource;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DistrictController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $query = $request->query('city_id');
        if ($query == null) {
            return DistrictResource::collection(District::all()->keyBy->id);
        }
        return DistrictResource::collection(District::where('city_id', $query)->get()->keyBy->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        if (Gate::denies('write-district')) {
            return abort(403);
        }

        $data = $request->all();

        if (District::where([
            ['name', '=', $data['name']],
            ['city_id', '=', $data['city_id']],
        ])->count() > 0) {
            return abort(409, 'District with the same name already exists.');
        }

        if (District::where([
            ['post_code', '=', $data['post_code']],
            ['city_id', '=', $data['city_id']],
        ])->count() > 0) {
            return abort(409, 'District with the same post code already exists.');
        }

        $new_district = District::create([
            'name' => $data['name'],
            'city_id' => $data['city_id'],
            'post_code' => $data['post_code'],
        ]);

        return new DistrictResource($new_district);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $district = District::find($id);

        if ($district == null) {
            return abort(404, 'Resource not found.');
        }
        return response([
            'city_id' => $district->city_id,
            'name' => $district->name,
            'post_code' => $district->post_code,
            'city' => $district->city->name . ", " . $district->name,
        ], 200);

        return new DistrictResource($district);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        if (Gate::denies('write-district')) {
            return abort(403);
        }

        $data = $request->all();
        $district = District::find($id);

        if ($district == null) {
            return abort(404, 'Resource not found');
        }

        foreach ($data as $key => $value) {
            $district[$key] = $value;
        }
        $district->save();

        return new DistrictResource($district);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        if (Gate::denies('write-district')) {
            return abort(403);
        }

        $district = District::find($id);

        if ($district == null) {
            return abort(404, 'Resource not found');
        }

        $district->delete();

        return response('Success.', 200);
    }
}
