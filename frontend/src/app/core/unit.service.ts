import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BackendResponse } from './model/backendResponse';
import { Entity } from './model/entity';
import { FloorPlan } from './model/floorPlan';
import { Reservable } from './model/reservable';
import { CondensedUnit, PostUnitData, Unit } from './model/unit';

export enum FilterType {
  CONDENSED = "condensed",
  OWNER_ID = "owner_id",
  COUNTRY_ID = "country_id",
  CITY_ID = "city_id",
  DISTRICT_ID = "district_id",
  ADMIN_ID = "admin_id",
}


@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  /**
   * CORE UNIT HANDLERS
   */
  async postUnit(unitData: PostUnitData) {
    const response = await lastValueFrom(this.http.post('/api/unit', unitData));
    console.log(response);
  }

  async getUnit(id: number){
    const unit = await lastValueFrom(this.http.get(`/api/unit/${id}`)) as Unit;
    return unit;
  }

  async getUnits(filters: Array<[FilterType, any]> = []) {
    let path = '/api/unit';
    if (filters !== []) {
      path = path + "?";

      filters.forEach((type, value) => {
        path = path + `${type}=${value}`;
      });
    }
    console.log(path);

    const response =  await lastValueFrom(this.http.get(path)) as BackendResponse<Unit | CondensedUnit>;
    return response.data;
  }

  async updateUnit(id: number, unitData: PostUnitData, fullResponse: boolean = false) {
    const response = await lastValueFrom(this.http.put(
        `/api/unit/${id}?full=${fullResponse}`,
        unitData
      )) as BackendResponse<Unit | CondensedUnit>;

    return response.data;
  }

  async deleteUnit(id: number) {
    return await lastValueFrom(this.http.delete(`/api/unit/${id}`));
  }


  /**
   * UNIT FLOOR PLAN HANDLERS
   */
  async getUnitPlan(unit: Unit) {
    const response = await lastValueFrom(
        this.http.get(`/api/unit/${unit.id}/floor_plan`)
      ) as BackendResponse<FloorPlan>;
    return response.data;
  }


  /**
   * FLOOR PLAN ENTITY HANDLERS
   */

  async getEntities(plan: FloorPlan) {
    const response = await lastValueFrom(
        this.http.get(`/api/unit/${plan.unit_id}/floor_plan/entity`)
      ) as BackendResponse<Entity[]>;
    return response.data;
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
