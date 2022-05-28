import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Unit } from './model/unit';
import { User, UserRole } from './model/user';

export interface UserAuthRequest {
  email: string;
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

  private _currentUser?: User;

  constructor(private httpClient: HttpClient) {}

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

  async login(userAuthRequest: UserAuthRequest) {
    //const user$ = this.httpClient.post('/login', userAuthRequest);
    //this._currentUser = await lastValueFrom(user$) as User;
    await lastValueFrom(this.httpClient.get('/sanctum/csrf-cookie'));

    console.log("session ok");
    const loginResult = await lastValueFrom(
      this.httpClient.post('/api/login', userAuthRequest)
    );

    console.log("login result");
    console.log(loginResult);

    const user$ = this.httpClient.get('/api/user');
    this._currentUser = await lastValueFrom(user$) as User;
    console.log(this._currentUser);
  }

  logout() {
    this._currentUser = undefined;
  }

  async getUsers() {
    const result = await lastValueFrom(this.httpClient.get('/api/users'));

    //return result;
    return AuthService.users;
  }

  getCurrentUser() {
    return this._currentUser;
  }
}
