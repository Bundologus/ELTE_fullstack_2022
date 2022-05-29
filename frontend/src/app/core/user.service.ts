import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Unit } from './model/unit';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  static _noUser : User = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    admin: false,
  }

  private _currentUser: User = UserService._noUser;

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getCurrentUser() {
    return this._currentUser;
  }

  setCurrentUser(user: User) {
    this._currentUser = user;
  }

  async isOwner() {
    return true;
    // TODO get owned items of user and return if there are more than 0
  }

  isOwnerOf(unit: Unit) {
    return unit.owner.id === this._currentUser.id;
  }

  async getUsers() {
    const result = await lastValueFrom(this.http.get('/api/users'));
    console.log(result);
    return result;
  }
}
