import { Injectable } from '@angular/core';

export interface UserAuthRequest {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn: boolean = false;

  isLoggedIn() {
    return this._isLoggedIn;
  }

  login() {
    this._isLoggedIn = true;
    console.log('login');
  }

  logout() {
    this._isLoggedIn = false;
    console.log('logout');
  }
}
