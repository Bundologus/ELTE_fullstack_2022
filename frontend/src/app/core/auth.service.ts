import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from './model/user';
import { UserService } from './user.service';

export interface UserAuthRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient, private userSvc: UserService) {}

  isDebugMode() {
    return true;
  }

  async login(userAuthRequest: UserAuthRequest) {
    //const user$ = this.http.post('/login', userAuthRequest);
    //this._currentUser = await lastValueFrom(user$) as User;
    await lastValueFrom(this.http.get('/sanctum/csrf-cookie'));
    await lastValueFrom(
      this.http.post('/auth/login', userAuthRequest)
    );

    const user = await lastValueFrom(this.http.get('/api/user')) as User;
    if (userAuthRequest.email === user.email) {
      this.userSvc.setCurrentUser(user);
    }
  }

  async logout() {
    await lastValueFrom(this.http.post('/auth/logut', {}));
    this.userSvc.setCurrentUser(UserService._noUser);
  }

}
