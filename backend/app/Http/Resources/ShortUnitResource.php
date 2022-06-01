<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShortUnitResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        /* $address = $this->city->name;
        if ($this->district_id != null) {
            $address = $address . " " . $this->district->name;
        }
        $address = $address . ", " . $this->street_address . ", " . $this->district->post_code; */

        return [
            "id" => $this->id,
            "name" => $this->name,
            "address" =>  $this->street_address, //$address,
            "description" => $this->description,
            "profile_picture" => $this->profile_picture,
        ];
    }
}
