import { Unit } from './unit';

export interface Floor_Plan {
  id: number;
  unit: Unit; // link to DTO
  width: number;
  height: number;
}
