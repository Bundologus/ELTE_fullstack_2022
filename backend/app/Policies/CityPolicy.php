<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CityPolicy {
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function read(User $user) {
        return Response::allow();
    }

    /**
     * Determine whether the user can create/modify/delete models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function write(User $user) {
        return $user->admin
            ? Response::allow()
            : Response::deny('You must be an administrator.');
    }
}
