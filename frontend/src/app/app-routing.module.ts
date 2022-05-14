import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { UnitListComponent } from './unit-list/unit-list.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'profile',
    component: ProfileFormComponent,
  },
  {
    path: 'restaurants',
    component: UnitListComponent,
  },
  {
    path: 'reservations',
    component: ReservationListComponent,
  },
  {
    path: 'units',
    component: UnitListComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
