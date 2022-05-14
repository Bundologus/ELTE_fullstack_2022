import { Injectable } from '@angular/core';
import { Unit } from '../core/unit';
import { User, MockUsers, UserRole } from '../core/user';

export interface UserAuthRequest {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser?: User = undefined;
  private _isOwner: boolean = false;

  isLoggedIn() {
    return this._currentUser !== undefined;
  }

  isOwner() {
    return this.isLoggedIn() && this._currentUser?.role === UserRole.Owner;
  }

  isOwnerOf(unit: Unit) {
    return unit.owner === this._currentUser;
  }

  isDebugMode() {
    return true;
  }

  login() {
    this._currentUser = MockUsers.users[0];
  }

  logout() {
    this._currentUser = undefined;
  }

  setAsOwner(state: boolean) {
    this._isOwner = state;
  }
}
