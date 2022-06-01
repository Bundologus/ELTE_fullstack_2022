import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Reservation } from '../core/model/reservation';
import { Unit } from '../core/model/unit';
import { ReservationService } from '../core/reservation.service';
import { UnitService } from '../core/unit.service';
import { UserService } from '../core/user.service';

interface ReservationInfo {
  reservationId: number;
  date: string;
  time: string;
  unit: string;
  reservedOn: string;
  status: string;
}

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private unitService: UnitService,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  unitId: number = -1;
  reservations: ReservationInfo[] = [];
  unit?: Unit;

  async ngOnInit(): Promise<void> {
    const unitId = this.route.snapshot.paramMap.get('unitId');
    this.unitId = unitId !== null ? parseInt(unitId!) : -1;
    if (this.unitId >= 0)
      this.unit = (await this.unitService.getUnit(this.unitId)) as Unit;
    await this.buildReservationsInfoTable();
  }

  async buildReservationsInfoTable() {
    let reservations: Reservation[] = this.reservationService.getReservations();
    const units: Unit[] = (await this.unitService.getUnits()) as Unit[];
    if (this.unit === undefined) {
      reservations = reservations.filter(
        (r) => r.user_id === this.userService.getCurrentUser().id
      );
    } else {
      reservations = reservations.filter((r) => r.unit_id === this.unit!.id);
    }
    for (let r of reservations) {
      this.reservations.push({
        reservationId: r.id,
        date: r.date.toDateString(),
        time:
          r.start_time.hours.toString() +
          ':' +
          r.start_time.minutes.toString() +
          ' - ' +
          r.end_time.hours.toString() +
          ':' +
          r.end_time.minutes.toString(),
        unit: units.find((u) => u.id === r.unit_id)!.name,
        reservedOn: r.reserved_on,
        status: r.status,
      });
    }
  }

  isOwnerOf(unit: Unit) {
    return unit.owner_id === this.userService.getCurrentUser().id;
  }
}
