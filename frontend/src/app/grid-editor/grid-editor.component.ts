import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Grid } from '../core/grid';
import { Entity, Entity_Type } from '../core/model/entity';
import { Floor_Plan } from '../core/model/floor_plan';
import { UnitService } from '../core/unit.service';

export class EditorOptions {
  paintTool!: string;
}

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
})
export class GridEditorComponent implements OnInit {
  @Input() plan!: Floor_Plan;

  @ViewChildren('paint_tool') paintToolSelector!: MatButtonToggleChange;

  cols!: number;
  rows!: number;
  grids!: Grid[][];
  editorOptions: EditorOptions = new EditorOptions();

  constructor(private unitService: UnitService) {}

  ngOnInit(): void {
    this.editorOptions.paintTool = 'walls';
    this.initGrids();
    this.loadPlan();
  }

  initGrids() {
    this.cols = this.plan.width;
    this.rows = this.plan.height;
    this.grids = [];
    for (let y = 0; y < this.rows; y++) {
      const columns: Grid[] = [];
      for (let x = 0; x < this.cols; x++) {
        columns.push(new Grid(x, y, x === this.cols - 1, y === this.rows - 1));
      }
      this.grids.push(columns);
    }
  }

  onChangePaintTool(change: MatButtonToggleChange) {
    this.editorOptions.paintTool = change.value;
  }

  loadPlan() {
    let entities: Entity[] = this.unitService.getEntities(this.plan);
    for (var entity of entities) {
      const vertices = JSON.parse(entity.vertices);
      if (entity.type === Entity_Type.Wall) {
        for (var vertex of vertices) {
          this.grids[vertex.y][vertex.x].type[vertex.d] = Entity_Type.Wall;
        }
      }
    }
  }

  savePlan() {
    const entities: Entity[] = [];

    const wall: Entity = new Entity();
    wall.floorPlan = this.plan;
    wall.type = Entity_Type.Wall;
    wall.vertices = this.bakeWallEntity();
    entities.push(wall);

    this.unitService.setEntities(this.plan, entities);
  }

  bakeWallEntity(): string {
    const wallData = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let d = 0; d < 9; d++) {
          if (this.grids[y][x].type[d] === Entity_Type.Wall) {
            wallData.push({ x: x, y: y, d: d });
          }
        }
      }
    }
    return JSON.stringify(wallData);
  }
}
