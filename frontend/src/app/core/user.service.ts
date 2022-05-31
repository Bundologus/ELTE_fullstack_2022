import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BackendResponse } from './model/backendResponse';
import { Unit } from './model/unit';
import { User } from './model/user';
import { FilterType, UnitService } from './unit.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static _noUser: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };

  private _currentUser: User = UserService._noUser;

  constructor(private http: HttpClient, private unitSvc: UnitService) {}

  getCurrentUser() {
    return this._currentUser;
  }

  setCurrentUser(user: User) {
    this._currentUser = user;
  }

  async isOwner(user: User = this._currentUser) {
    return user.admin; // WIP
    const units = await this.unitSvc.getUnits([[FilterType.OWNER_ID, user.id]]);
  }

  async isOwnerOf(unit_id: number) {
    console.log('isOwnerOf');
    const unit: Unit = await this.unitSvc.getUnit(unit_id);
    return unit.owner.id === this._currentUser.id;
  }

  async getUsers() {
    const result = (await lastValueFrom(
      this.http.get('/api/users')
    )) as BackendResponse<User>;
    console.log(result.data);
    return result.data;
  }
}
