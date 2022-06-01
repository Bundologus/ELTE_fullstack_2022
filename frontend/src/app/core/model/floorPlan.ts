import { Entity } from './entity';

export interface FloorPlan {
  id: number;
  unit_id: number;
  width: number;
  height: number;
  entities: Entity[];
}
