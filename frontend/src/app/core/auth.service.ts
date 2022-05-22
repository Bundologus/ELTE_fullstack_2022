import { Injectable } from '@angular/core';
import { Unit } from './model/unit';
import { User, UserRole } from './model/user';

export interface UserAuthRequest {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static users: User[] = [
    {
      firstName: 'Süsü',
      email: 'susu@hetedhet.hu',
      role: UserRole.Owner,
    },
    {
      firstName: 'Leonidász',
      email: 'this_is@sparta.gr',
      role: UserRole.Owner,
    },
    {
      firstName: 'Elek',
      email: 'elek@teszt.hu',
      role: UserRole.User,
    },
  ];

  private _currentUser?: User = AuthService.users[0];

  isDebugMode() {
    return true;
  }

  isLoggedIn() {
    return this._currentUser !== undefined;
  }

  isOwner() {
    return this.isLoggedIn() && this._currentUser?.role === UserRole.Owner;
  }

  isOwnerOf(unit: Unit) {
    return unit.owner === this._currentUser;
  }

  login() {
    this._currentUser = AuthService.users[0];
  }

  logout() {
    this._currentUser = undefined;
  }

  getUsers() {
    return AuthService.users;
  }

  getCurrentUser() {
    return this._currentUser;
  }
}
