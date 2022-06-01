<?php

namespace App\Policies;

use App\Models\Unit;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class UnitPolicy {
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function modify(User $user, Unit $unit) {
        if (Auth::hasUser()) {
            $user = Auth::user();
            if ($unit->owner_id == $user->id) {
                return Response::allow();
            }
        }

        return Response::deny('You must be the owner to delete.');
    }

    public function delete(User $user, Unit $unit) {
        if (Auth::hasUser()) {
            $user = Auth::user();
            if ($unit->owner_id == $user->id) {
                return Response::allow();
            }
        }

        return Response::deny('You must be the owner to delete.');
    }
}
