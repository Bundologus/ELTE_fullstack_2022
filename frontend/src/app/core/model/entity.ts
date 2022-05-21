import { Floor_Plan } from './floor_plan';
import { Reservable } from './reservable';

export class Entity {
  id?: number;
  parent?: Entity; // link to DTO
  floorPlan!: Floor_Plan; // link to DTO
  reservable?: Reservable; // link to DTO
  type!: Entity_Type;
  customPlanData?: string;
  customUserData?: string;
  vertices!: string;
}

export enum Entity_Type {
  None = 0,
  Wall = 1,
  Door = 8,
  Window = 16,
  Table = 24,
  Chair = 32,
  Misc = 64,
}
