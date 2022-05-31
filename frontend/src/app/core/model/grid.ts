import { Entity_Type } from './entity';
import { Reservable } from './reservable';

// Runtime-only representation of editor grid elements
// Converted to Entity.vertices/custom_fp_data on save

export class Grid {
  x!: number;
  y!: number;
  isLastX!: boolean;
  isLastY!: boolean;
  isMarked!: boolean[];
  type!: Entity_Type[];
  data: string;
  runtimeId: number = 0; // only used for grouped entities (tables), all others (and also the first group) can have it at 0
  reservableData?: Reservable; // editor-only (identical) representation of reservable information
  special?: boolean; // editor-only special flag for some operations
  isDirty: boolean[] = [false, false, false];

  constructor(x: number, y: number, isLastX: boolean, isLastY: boolean) {
    this.x = x;
    this.y = y;
    this.isLastX = isLastX;
    this.isLastY = isLastY;
    this.isMarked = new Array(9).fill(false); // runtime highlighting
    this.type = new Array(9).fill(Entity_Type.None);
    this.data = '';
  }
}
