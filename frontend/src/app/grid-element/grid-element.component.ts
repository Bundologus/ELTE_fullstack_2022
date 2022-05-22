import { Component, Input, OnInit } from '@angular/core';
import { Grid } from '../core/grid';
import { Entity_Type } from '../core/model/entity';
import { EditorOptions } from '../grid-editor/grid-editor.component';

@Component({
  selector: 'app-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
})
export class GridElementComponent implements OnInit {
  @Input() grid!: Grid;
  @Input() grids!: Grid[][];
  @Input() editorOptions!: EditorOptions;

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
    if (!this.evaluateSideEligibility(dir)) return;
    this.markNeighboringSides(dir, true);
  }

  onElementCancelHover(dir: number) {
    if (!this.evaluateSideEligibility(dir)) return;
    this.markNeighboringSides(dir, false);
  }

  onElementClick(dir: number) {
    if (!this.evaluateSideEligibility(dir)) return;
    if (this.editorOptions.paintTool === 'walls')
      this.setNeighboringSides(dir, Entity_Type.Wall);
    else if (this.editorOptions.paintTool === 'doors')
      this.setNeighboringSides(dir, Entity_Type.Door);
    else if (this.editorOptions.paintTool === 'windows')
      this.setNeighboringSides(dir, Entity_Type.Window);
    else if (this.editorOptions.paintTool === 'tables')
      if (
        this.setNeighboringSides(dir, Entity_Type.Table) === Entity_Type.Table
      )
        this.placeTable();
      else this.removeTable();
    else if (this.editorOptions.paintTool === 'chairs')
      if (
        this.setNeighboringSides(dir, Entity_Type.Chair) === Entity_Type.Chair
      )
        this.placeChair();
      else this.removeChair();
  }

  placeTable() {
    const neighboringTables: Grid[] = this.getNeighboringEntities(
      Entity_Type.Table
    );
    // Nincs asztal mellette
    if (neighboringTables.length === 0) {
    }
    // Egy asztal, vagy ugyanannak a nagy asztalnak több eleme van mellette
    else if (
      neighboringTables.filter(
        (t) => t.runtimeId !== neighboringTables[0].runtimeId
      ).length === 0
    ) {
    }
    // Több különböző asztal van mellette
    else {
      this.setNeighboringSides(0, Entity_Type.None);
    }
  }

  removeTable() {}

  placeChair() {
    const neighboringTables: Grid[] = this.getNeighboringEntities(
      Entity_Type.Table
    );
    // Nincs asztal mellette
    if (neighboringTables.length === 0) {
      this.setNeighboringSides(0, Entity_Type.None);
    }
    // Egy asztal, vagy ugyanannak a nagy asztalnak több eleme van mellette
    else if (
      neighboringTables.filter(
        (t) => t.runtimeId !== neighboringTables[0].runtimeId
      ).length === 0
    ) {
    }
    // Több különböző asztal van mellette
    else {
      this.setNeighboringSides(0, Entity_Type.None);
    }
  }

  removeChair() {}

  getNeighboringEntities(type: Entity_Type): Grid[] {
    const neighboringEntityGrids: Grid[] = [];
    for (var d = 1; d <= 7; d += 2) {
      const x = this.grid.x + this.dirs[d][0];
      const y = this.grid.y + this.dirs[d][1];
      if (x < 0 || y < 0 || y >= this.grids.length || x >= this.grids[y].length)
        continue;
      if (this.grids[y][x].type[0] === type)
        neighboringEntityGrids.push(this.grids[y][x]);
    }
    return neighboringEntityGrids;
  }

  evaluateSideEligibility(dir: number): boolean {
    if (
      dir % 2 === 0 &&
      ['doors', 'windows'].includes(this.editorOptions.paintTool)
    ) {
      return false;
    }
    if (
      dir !== 0 &&
      ['tables', 'chairs', 'text'].includes(this.editorOptions.paintTool)
    ) {
      return false;
    }
    return true;
  }

  setNeighboringSides(dir: number, type: Entity_Type): Entity_Type {
    if (this.grid.type[dir] === type) this.grid.type[dir] = Entity_Type.None;
    else this.grid.type[dir] = type;
    for (const [x, y, d] of this.getNeighboringSides(dir)) {
      this.grids[y][x].type[d] = this.grid.type[dir];
    }
    return this.grid.type[dir];
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
