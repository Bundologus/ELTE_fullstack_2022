<?php

namespace App\Http\Resources;

use App\Models\Reservable;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource {
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
        // return parent::toArray($request);
        $user = User::find($this->user_id);
        $reservable = Reservable::find($this->reservable_id);

        return [
            'id' => $this->id,
            'user' => $user,
            'reservable' => $reservable,
            'created_at' => $this->created_at,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'status' => $this->status,
        ];
    }
}
