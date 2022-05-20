import { Floor_Plan } from './floor_plan';

export class Entity {
  id?: number;
  parent?: Entity;
  floorPlan!: Floor_Plan;
  reservable?: number; // TBD: create 'Reservable' class
  type!: Entity_Type;
  customPlanData?: string;
  customUserData?: string;
  vertices!: string;
}

export enum Entity_Type {
  Blocked = 0,
  Wall = 1,
  Door = 8,
  Window = 16,
  Table = 24,
  Chair = 32,
  Misc = 64,
}
