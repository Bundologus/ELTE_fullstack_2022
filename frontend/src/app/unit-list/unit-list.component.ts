import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MockUnits, Unit } from '../core/unit';
import { MockUsers, User } from '../core/user';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  units?: Unit[] = MockUnits.units;
  users?: User[] = MockUsers.users;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  goToReservation() {}
}
