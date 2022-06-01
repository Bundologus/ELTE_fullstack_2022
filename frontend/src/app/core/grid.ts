import { Entity_Type } from './model/entity';

// Runtime-only representation of editor grid elements
// Converted to Entity.vertices/custom_fp_data on save

export class Grid {
  x!: number;
  y!: number;
  isLastX!: boolean;
  isLastY!: boolean;
  isMarked!: boolean[];
  type!: Entity_Type[];
  runtimeId: number = 0;

  constructor(x: number, y: number, isLastX: boolean, isLastY: boolean) {
    this.x = x;
    this.y = y;
    this.isLastX = isLastX;
    this.isLastY = isLastY;
    this.isMarked = new Array(9).fill(false); // runtime highlighting
    this.type = new Array(9).fill(Entity_Type.None);
  }
}
