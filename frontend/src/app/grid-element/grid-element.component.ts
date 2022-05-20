import { Component, Input, OnInit } from '@angular/core';
import { Grid } from '../core/grid';

@Component({
  selector: 'app-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
})
export class GridElementComponent implements OnInit {
  @Input() grid!: Grid;
  @Input() grids!: Grid[][];
  @Input() tool!: string;

  dirs: [number, number][] = [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];

  constructor() {}

  ngOnInit(): void {}

  onElementHover(dir: number) {
    this.markNeighboringSides(dir, true);
  }

  onElementCancelHover(dir: number) {
    this.markNeighboringSides(dir, false);
  }

  onElementClick(dir: number) {
    if (this.tool === 'walls') this.wallNeighboringSides(dir);
  }

  wallNeighboringSides(dir: number) {
    this.grid.isWall[dir] = !this.grid.isWall[dir];
    for (const [x, y, d] of this.getNeighboringSides(dir)) {
      this.grids[y][x].isWall[d] = !this.grids[y][x].isWall[d];
    }
  }

  markNeighboringSides(dir: number, state: boolean) {
    this.grid.isMarked[dir] = state;
    for (const [x, y, d] of this.getNeighboringSides(dir)) {
      this.grids[y][x].isMarked[d] = state;
    }
  }

  getNeighboringSides(dir: number) {
    let sides: [number, number, number][] = [];
    if (dir === 0) return sides;
    if (dir % 2 === 0) {
      const x1: number = this.grid.x + this.dirs[this.nextDir(dir)][0];
      const y1: number = this.grid.y + this.dirs[this.nextDir(dir)][1];
      const d1: number = this.prevDir(this.prevDir(dir));
      if (
        y1 >= 0 &&
        x1 >= 0 &&
        y1 < this.grids.length &&
        x1 < this.grids[y1].length
      )
        sides.push([x1, y1, d1]);
      const x2: number = this.grid.x + this.dirs[this.prevDir(dir)][0];
      const y2: number = this.grid.y + this.dirs[this.prevDir(dir)][1];
      const d2: number = this.nextDir(this.nextDir(dir));
      if (
        y2 >= 0 &&
        x2 >= 0 &&
        y2 < this.grids.length &&
        x2 < this.grids[y2].length
      )
        sides.push([x2, y2, d2]);
    }
    if (!this.isSideElement(dir)) {
      const xx: number = this.grid.x + this.dirs[dir][0];
      const yy: number = this.grid.y + this.dirs[dir][1];
      const dd: number = this.flipDir(dir);
      sides.push([xx, yy, dd]);
    }
    return sides;
  }

  isSideElement(dir: number) {
    if (
      (this.grid.x === 0 && (dir === 6 || dir === 7 || dir === 8)) ||
      (this.grid.isLastX && (dir === 2 || dir === 3 || dir === 4)) ||
      (this.grid.y === 0 && (dir === 8 || dir === 1 || dir === 2)) ||
      (this.grid.isLastY && (dir === 4 || dir === 5 || dir === 6))
    ) {
      return true;
    }
    return false;
  }

  flipDir(dir: number) {
    return dir > 4 ? dir - 4 : dir + 4;
  }

  nextDir(dir: number) {
    return dir + 1 >= 9 ? 1 : dir + 1;
  }

  prevDir(dir: number) {
    return dir - 1 <= 0 ? 8 : dir - 1;
  }
}
