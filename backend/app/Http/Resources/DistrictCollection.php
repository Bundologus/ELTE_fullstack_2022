<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DistrictCollection extends ResourceCollection {
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        return [
            'city_id' => $this->city_id,
            'id' => $this->id,
            'name' => $this->city->name . ", " . $this->name,
            'post_code' => $this->post_code,
        ];
    }
}
