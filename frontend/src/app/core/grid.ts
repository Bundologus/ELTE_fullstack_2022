export class Grid {
  x!: number;
  y!: number;
  isLastX!: boolean;
  isLastY!: boolean;
  isMarked!: boolean[];
  isWall!: boolean[];

  constructor(x: number, y: number, isLastX: boolean, isLastY: boolean) {
    this.x = x;
    this.y = y;
    this.isLastX = isLastX;
    this.isLastY = isLastY;
    this.isMarked = new Array(9).fill(false);
    this.isWall = new Array(9).fill(false);
  }
}
