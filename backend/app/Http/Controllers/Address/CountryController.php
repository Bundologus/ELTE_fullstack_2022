<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryResource;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CountryController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list() {
        return CountryResource::collection(Country::all()->keyBy->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        if (Gate::denies('write-country')) {
            return abort(403);
        }

        $data = $request->all();

        if (Country::where('name', $data['name'])->count() > 0) {
            return abort(409, 'Country with the same name already exists.');
        }

        $new_country = Country::create([
            'name' => $data['name'],
        ]);

        return new CountryResource($new_country);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $country = Country::find($id);

        if ($country == null) {
            return abort(404, 'Resource not found.');
        }

        return new CountryResource($country);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        if (Gate::denies('write-country')) {
            return abort(403);
        }

        $data = $request->all();
        $country = Country::find($id);

        if ($country == null) {
            return abort(404, 'Resource not found');
        }

        $country->name = $data['name'];
        $country->save();

        return new CountryResource($country);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        if (Gate::denies('write-country')) {
            return abort(403);
        }

        $country = Country::find($id);

        if ($country == null) {
            return abort(404, 'Resource not found');
        }

        $country->delete();

        return response('Success.', 200);
    }
}
