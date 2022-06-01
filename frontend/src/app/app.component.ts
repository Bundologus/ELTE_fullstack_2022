import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { UnitService } from './core/unit.service';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Vendéglátó Manager';

  constructor(
    private router: Router,
    private unitSvc: UnitService,
    public authSvc: AuthService,
    public userSvc: UserService
  ) {}

  ngOnInit() {
    this.userSvc.setCurrentUser(this.unitSvc.users[0]);
  }

  login() {
    this.router.navigate(['/', 'login']);
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/', 'login']);
  }

  changeDebugUser() {
    if (this.userSvc.getCurrentUser().id === 1)
      this.userSvc.setCurrentUser(this.unitSvc.users[1]);
    else if (this.userSvc.getCurrentUser().id === 2)
      this.userSvc.setCurrentUser(UserService._noUser);
    else this.userSvc.setCurrentUser(this.unitSvc.users[0]);
  }
}
