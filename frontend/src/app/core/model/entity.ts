export class Entity {
  constructor(fpId: number) {
    this.floor_plan_id = fpId;
    this.reservable_id = -1;
    this.type = 0;
    this.data = '';
    this.vertices = '';
  }

  id?: number;
  floor_plan_id: number;
  reservable_id?: number;
  type: Entity_Type;
  data: string;
  vertices: string;
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
