import { Component, Input, OnInit, ViewChildren } from '@angular/core';

import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatInput } from '@angular/material/input';
import { Grid } from '../core/grid';
import { Entity, Entity_Type } from '../core/model/entity';
import { Floor_Plan } from '../core/model/floor_plan';
import { UnitService } from '../core/unit.service';

export class EditorOptions {
  nextId: number = 0;
  paintTool!: string;
  customData?: string;
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
    this.editorOptions.nextId = 0;
    let entities: Entity[] = this.unitService.getEntities(this.plan);
    for (var entity of entities) {
      const vertices = JSON.parse(entity.vertices);
      for (var vertex of vertices) {
        this.grids[vertex.y][vertex.x].type[vertex.d] = entity.type;
        if (entity.type === Entity_Type.Table) {
          this.grids[vertex.y][vertex.x].runtimeId = this.editorOptions.nextId;
        }
      }
      if (entity.type === Entity_Type.Table) {
        this.editorOptions.nextId++;
      }
    }
  }

  savePlan() {
    const entities: Entity[] = [];
    const tables = [];

    const wall: Entity = new Entity();
    wall.floorPlan = this.plan;
    wall.type = Entity_Type.Wall;
    wall.vertices = this.bakeWallEntity();
    entities.push(wall);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let d = 0; d <= 8; d++) {
          if (
            this.grids[y][x].type[d] === Entity_Type.Door ||
            this.grids[y][x].type[d] === Entity_Type.Window ||
            this.grids[y][x].type[d] === Entity_Type.Chair ||
            this.grids[y][x].type[d] === Entity_Type.Misc
          ) {
            const entity: Entity = new Entity();
            entity.floorPlan = this.plan;
            entity.type = this.grids[y][x].type[d];
            const vertices = [{ x: x, y: y, d: d }];
            entity.vertices = JSON.stringify(vertices);
            entities.push(entity);
          } else if (this.grids[y][x].type[d] === Entity_Type.Table) {
            const table = { x: x, y: y, id: this.grids[y][x].runtimeId };
            tables.push(table);
          }
        }
      }
    }

    const tableGroups = this.groupBy(tables, 'id');
    const keys = Object.keys(tableGroups);
    for (let i = 0; i < keys.length; i++) {
      const tableGroup: Entity = new Entity();
      tableGroup.floorPlan = this.plan;
      tableGroup.type = Entity_Type.Table;
      const vertices = [];
      const key: string = keys[i].toString();
      for (let j = 0; j < tableGroups[key].length; j++) {
        vertices.push({
          x: tableGroups[key][j].x,
          y: tableGroups[key][j].y,
          d: 0,
        });
      }
      tableGroup.vertices = JSON.stringify(vertices);
      entities.push(tableGroup);
    }

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

  groupBy = (array: any[], key: any) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
}
