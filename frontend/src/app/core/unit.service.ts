import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Entity } from './model/entity';
import { Floor_Plan } from './model/floor_plan';
import { Unit } from './model/unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  units: Unit[] = [
    {
      id: 1,
      owner: AuthService.users[0],
      name: 'Süsü konyhája',
      shortDesc: 'hagyományos magyar',
      description: 'Mesebeli magyar ételek',
    },
    {
      id: 2,
      owner: AuthService.users[1],
      name: 'Gyors Gyros',
      shortDesc: 'görög, közel-keleti',
      description: 'A pitába!',
    },
  ];

  plans: Floor_Plan[] = [
    { id: 1, unit: this.units[0], width: 8, height: 8 },
    { id: 2, unit: this.units[1], width: 13, height: 9 },
  ];

  entities: Entity[] = [];

  constructor() {}

  getUnit(unitId: number) {
    return this.units.find((u) => u.id === unitId);
  }

  getUnits() {
    return this.units;
  }

  getUnitPlan(unit: Unit) {
    return this.plans.find((p) => p.unit === unit);
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
    this.entities.splice(this.entities.findIndex((e) => e === entity));
  }
}
