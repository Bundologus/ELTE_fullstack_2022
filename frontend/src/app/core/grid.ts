export class Grid {
  x!: number;
  y!: number;
  wallTop: boolean = false;
  wallLeft: boolean = false;
  wallBottom: boolean = false;
  wallRight: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
