import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BackendResponse } from './model/backendResponse';
import { Entity } from './model/entity';
import { FloorPlan } from './model/floorPlan';
import { Reservable } from './model/reservable';
import { CondensedUnit, PostUnitData, Unit } from './model/unit';
import { User } from './model/user';
import { UserService } from './user.service';

export enum FilterType {
  CONDENSED = 'condensed',
  OWNER_ID = 'owner_id',
  COUNTRY_ID = 'country_id',
  CITY_ID = 'city_id',
  DISTRICT_ID = 'district_id',
  ADMIN_ID = 'admin_id',
}

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  /**
   * TEMPORARY MOCK DATA
   */

  _MOCK_ENABLED: boolean = true;

  users: User[] = [
    {
      id: 1,
      first_name: 'Süsü',
      last_name: 'Sárkány',
      email: 'susu@susu.hu',
      phone: '',
      admin: true,
    },
    {
      id: 2,
      first_name: 'Leonidász',
      last_name: '',
      email: 'leo@leo.hu',
      phone: '',
      admin: true,
    },
  ];

  plans: FloorPlan[] = [
    { id: 1, unit_id: 1, width: 8, height: 8, entities: [] },
    { id: 2, unit_id: 2, width: 13, height: 9, entities: [] },
  ];

  units: Unit[] = [
    {
      id: 1,
      owner: this.users[0],
      name: 'Süsü konyhája',
      description: 'Mesebeli magyar ételek',
      floor_plan: this.plans[0],
      default_min_time: { hours: 1, minutes: 0 },
      default_max_time: { hours: 3, minutes: 0 },
      default_time_step: { hours: 0, minutes: 30 },
    },
    {
      id: 2,
      owner: this.users[1],
      name: 'Gyors Gyros',
      description: 'A pitába!',
      floor_plan: this.plans[1],
      default_min_time: { hours: 2, minutes: 0 },
      default_max_time: { hours: 4, minutes: 0 },
      default_time_step: { hours: 1, minutes: 0 },
    },
  ];

  reservables: Reservable[] = [];

  entities: Entity[] = [];

  /**
   * CORE UNIT HANDLERS
   */

  async postUnit(unitData: PostUnitData) {
    const response = await lastValueFrom(this.http.post('/api/unit', unitData));
    console.log(response);
  }

  async getUnit(id: number): Promise<Unit> {
    console.log('getUnit');

    if (this._MOCK_ENABLED) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.units.find((u) => u.id === id)!);
        }, 1);
      });
    }

    const unit = (await lastValueFrom(
      this.http.get(`/api/unit/${id}`)
    )) as Unit;

    return unit;
  }

  async getUnits(filters: Array<[FilterType, any]> = []) {
    console.log('getUnits');

    if (this._MOCK_ENABLED) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.units);
        }, 10);
      });
    }

    let path = '/api/unit';
    if (filters !== []) {
      path = path + '?';
      filters.forEach((type, value) => {
        path = path + `${type}=${value}`;
      });
    }
    console.log(path);

    const response = (await lastValueFrom(
      this.http.get(path)
    )) as BackendResponse<Unit | CondensedUnit>;

    return response.data;
  }

  async updateUnit(
    id: number,
    unitData: PostUnitData,
    fullResponse: boolean = false
  ) {
    const response = (await lastValueFrom(
      this.http.put(`/api/unit/${id}?full=${fullResponse}`, unitData)
    )) as BackendResponse<Unit | CondensedUnit>;

    return response.data;
  }

  async deleteUnit(id: number) {
    if (this._MOCK_ENABLED) {
      this.units.splice(
        this.units.findIndex((u) => u.id === id),
        1
      );
      return;
    }

    return await lastValueFrom(this.http.delete(`/api/unit/${id}`));
  }

  /**
   * UNIT FLOOR PLAN HANDLERS
   */

  async getUnitPlan(unit: Unit) {
    console.log('getUnitPlan');

    if (this._MOCK_ENABLED) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.plans.find((p) => p.unit_id === unit.id));
        }, 10);
      });
    }

    const response = (await lastValueFrom(
      this.http.get(`/api/unit/${unit.id}/floor_plan`)
    )) as BackendResponse<FloorPlan>;
    return response.data;
  }

  /**
   * FLOOR PLAN ENTITY HANDLERS
   */

  /*
  async getEntities(plan: FloorPlan) {
    const response = (await lastValueFrom(
      this.http.get(`/api/unit/${plan.unit_id}/floor_plan/entity`)
    )) as BackendResponse<Entity>;
    return response.data;
  }
  */

  getEntities(plan: FloorPlan) {
    return this.entities.filter((e) => e.floor_plan_id === plan.id);
  }

  setEntities(plan: FloorPlan, entities: Entity[]) {
    const entitiesToRemove: Entity[] = this.getEntities(plan);
    for (var entity of entitiesToRemove) {
      this.deleteEntity(entity);
    }
    this.entities = this.entities.concat(entities);
  }

  deleteEntity(entity: Entity) {
    this.entities.splice(
      this.entities.findIndex((e) => e === entity),
      1
    );
  }

  /**
   * RESERVABLE HANDLERS
   */

  getReservables() {
    console.log(this.reservables);
    return this.reservables;
  }

  createReservable(reservable: Reservable) {
    reservable.id = this.reservables.length + 1;
    this.reservables.push(reservable);
    console.log(this.reservables);
    return reservable;
  }

  updateReservable(reservable: Reservable) {
    const reservableId: number = this.reservables.findIndex(
      (r) => r.id === reservable.id
    );
    if (reservableId === 0) return;
    this.reservables.splice(reservableId, 1, reservable);
  }

  deleteReservable(reservable: Reservable) {
    this.reservables.splice(
      this.reservables.findIndex((r) => r.id === reservable.id),
      1
    );
  }
}
