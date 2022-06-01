<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource {
    /**
     * Indicates if the resource's collection keys should be preserved.
     *
     * @var bool
     */
    public $preserveKeys = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        return [
            "id" => $this->id,
            "owner" => new UserResource($this->owner),
            "name" => $this->name,
            //"county" => new CountryResource($this->country),
            //"city" => new CityResource($this->city),
            //"district" => new DistrictResource($this->district),
            "description" => $this->description,
            "profile_picture" => $this->profile_picture,
            "reservation_terms" => $this->reservation_terms,
            "default_min_time" => Carbon::today()->add($this->default_min_time)->toTimeString(),
            "default_max_time" => Carbon::today()->add($this->default_max_time)->toTimeString(),
            "default_time_step" => Carbon::today()->add($this->default_time_step)->toTimeString(),
            "opening_hours" => OpeningHoursResource::collection($this->openingHours),
            "floor_plan" => new FloorPlanResource($this->floorPlan),
        ];
    }
}
