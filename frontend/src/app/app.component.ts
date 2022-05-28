import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Vendéglátó Manager';

  constructor(private router: Router, public authService: AuthService) {}

  login() {
    //this.authService.login();
    this.router.navigate(['/', 'login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }
}
