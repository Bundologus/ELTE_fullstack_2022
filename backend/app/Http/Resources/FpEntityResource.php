<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FpEntityResource extends JsonResource {
    /**
     * Indicates if the resource's collection keys should be preserved.
     *
     * @var bool
     */
    public $preserveKeys = true;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        return [
            "id" => $this->id,
            "floor_plan_id" => $this->floor_plan_id,
            "type" => $this->type,
            "data" => $this->data,
            "vertices" => $this->vertices,
            "reservable_id" => $this->when($this->reservable != null, $this->reservable->id),
        ];
    }
}
