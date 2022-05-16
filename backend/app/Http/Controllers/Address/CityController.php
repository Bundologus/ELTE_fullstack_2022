<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use App\Http\Resources\CityResource;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $query = $request->query('country_id');
        if ($query == null) {
            return CityResource::collection(City::all());
        }
        return CityResource::collection(City::where('country_id', $query)->get());
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

        if (City::where([
            ['name', '=', $data['name']],
            ['country_id', '=', $data['country_id']],
        ])->count() > 0) {
            return abort(409, 'City with the same name already exists.');
        }

        if (City::where([
            ['post_code', '=', $data['post_code']],
            ['country_id', '=', $data['country_id']],
        ])->count() > 0) {
            return abort(409, 'City with the same post code already exists.');
        }


        $new_city = City::create([
            'name' => $data['name'],
            'country_id' => $data['country_id'],
            'post_code' => array_key_exists('post_code', $data) ? $data['post_code'] : '',
        ]);

        return new CityResource($new_city);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $city = City::find($id);

        if ($city == null) {
            return abort(404, 'Resource not found.');
        }

        return new CityResource($city);
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
        $city = City::find($id);

        if ($city == null) {
            return abort(404, 'Resource not found');
        }

        foreach ($data as $key => $value) {
            $city[$key] = $value;
        }
        $city->save();

        return new CityResource($city);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $city = City::find($id);

        if ($city == null) {
            return abort(404, 'Resource not found');
        }

        $city->delete();

        return response('Success.', 200);
    }
}
