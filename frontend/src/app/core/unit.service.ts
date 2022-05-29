import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Entity } from './model/entity';
import { Floor_Plan } from './model/floor_plan';
import { Reservable } from './model/reservable';
import { Unit } from './model/unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  entities: Entity[] = [];

  reservables: Reservable[] = [];

  constructor(private http: HttpClient) {}

  async getUnit(id: number): Unit {
    const unit = await lastValueFrom(this.http.get(`/api/unit/${id}`)) as Unit;
    return unit;
  }

  async getUnits() {
    return await lastValueFrom(this.http.get('/api/unit'));
  }

  async deleteUnit(id: number) {
    return await lastValueFrom(this.http.delete(`/api/unit/${id}`))
  }

  async getUnitPlan(unit: Unit) {
    return ;
  }

  getEntities(plan: Floor_Plan) {
    return this.entities.filter((e) => e.floorPlan === plan);
  }

  setEntities(plan: Floor_Plan, entities: Entity[]) {
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
