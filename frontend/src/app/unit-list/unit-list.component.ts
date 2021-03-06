import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Unit } from '../core/model/unit';
import { UnitService } from '../core/unit.service';
import { User } from '../core/model/user';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  users?: User[] = this.authService.getUsers();
  units?: Unit[];
  paginatedUnits?: Unit[];
  firstPageSize: number = 5;
  managerMode: boolean = false;

  constructor(
    public authService: AuthService,
    private unitService: UnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterUnits();
    this.paginatedUnits = this.units?.slice(0, this.firstPageSize);
  }

  filterUnits() {
    let filteredUnits: Unit[] = this.unitService.getUnits();
    this.managerMode = this.router.url.endsWith('units');
    if (this.managerMode)
      filteredUnits = filteredUnits.filter(
        (u) => u.owner === this.authService.getCurrentUser()
      );
    this.units = filteredUnits;
  }

  paginateUnits(pageEvent: PageEvent) {
    this.filterUnits();
    const startElement = pageEvent.pageIndex * pageEvent.pageSize;
    this.paginatedUnits = this.units?.slice(
      startElement,
      startElement + pageEvent.pageSize
    );
  }

  goToReservation(unit: Unit) {}

  goToUnitManagement(unit: Unit) {}

  goToReservationsManagement(unit: Unit) {}
}
