import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Unit } from '../core/model/unit';
import { UnitService } from '../core/unit.service';
import { User } from '../core/model/user';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  units!: Unit[];
  paginatedUnits?: Unit[];
  firstPageSize: number = 5;
  managerMode: boolean = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private unitService: UnitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filterUnits();
    this.paginatedUnits = this.units?.slice(0, this.firstPageSize);
  }

  async filterUnits() {
    let filteredUnits: Unit[] = (await this.unitService.getUnits()) as Unit[];
    this.managerMode = this.router.url.endsWith('units');
    if (this.managerMode)
      filteredUnits = filteredUnits.filter(
        (u) => u.owner === this.userService.getCurrentUser()
      );
    this.units = filteredUnits;
    this.paginatedUnits = filteredUnits;
  }

  async paginateUnits(pageEvent: PageEvent) {
    await this.filterUnits();
    const startElement = pageEvent.pageIndex * pageEvent.pageSize;
    this.paginatedUnits = this.units?.slice(
      startElement,
      startElement + pageEvent.pageSize
    );
  }

  goToReservation(unit: Unit) {}

  goToUnitManagement(unit: Unit) {}

  goToReservationsManagement(unit: Unit) {}

  isOwnerOf(unit: Unit) {
    return unit.owner === this.userService.getCurrentUser();
  }
}
