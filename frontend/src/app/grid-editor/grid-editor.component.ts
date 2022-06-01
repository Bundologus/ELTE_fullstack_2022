import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { AuthService } from '../core/auth.service';
import { Grid } from '../core/model/grid';
import { Entity, Entity_Type } from '../core/model/entity';
import { FloorPlan } from '../core/model/floorPlan';
import { Reservable } from '../core/model/reservable';
import { UnitService } from '../core/unit.service';
import { UserService } from '../core/user.service';
import { GridElementComponent } from '../grid-element/grid-element.component';
import { Unit } from '../core/model/unit';

export class EditorOptions {
  nextId: number = 0;
  paintTool!: string;
  customData: string = '';
  selectedGrid?: Grid;
  isDirty: boolean = false;
}

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
})
export class GridEditorComponent implements OnInit {
  @Input() unit!: Unit;
  @Input() plan!: FloorPlan;
  @Input() ownerMode!: boolean;

  @Output() onSelectReservable: EventEmitter<Reservable> = new EventEmitter();
  @Output() onDeselectReservable: EventEmitter<void> = new EventEmitter();

  @ViewChildren('paint_tool') paintToolSelector!: MatButtonToggleChange;

  cols!: number;
  rows!: number;
  grids!: Grid[][];
  editorOptions: EditorOptions = new EditorOptions();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.editorOptions.paintTool = 'edit';
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
    this.editorOptions.customData = '';
    this.editorOptions.selectedGrid = undefined;
  }

  onChangeDatafield(value: string) {
    if (this.editorOptions.selectedGrid !== undefined) {
      this.editorOptions.selectedGrid.data = value;
    }
    this.setGridsDirty();
  }

  onGridChange() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grids[y][x].type[0] === Entity_Type.Table) {
          this.grids[y][x].reservableData!.max_spaces = 0;
        }
        this.grids[y][x].special = false;
      }
    }
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grids[y][x].type[0] === Entity_Type.Table) {
          const chairs: Grid[] = GridElementComponent.getNeighboringEntities(
            this.grids[y][x],
            this.grids,
            Entity_Type.Chair
          );
          for (var chair of chairs) {
            if (this.grids[chair.y][chair.x].special === false) {
              this.grids[y][x].reservableData!.max_spaces++;
              this.grids[chair.y][chair.x].special = true;
            }
          }
        }
      }
    }
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grids[y][x].type[0] === Entity_Type.Table) {
          if (
            this.grids[y][x].reservableData!.min_spaces >
            this.grids[y][x].reservableData!.max_spaces
          )
            this.grids[y][x].reservableData!.min_spaces =
              this.grids[y][x].reservableData!.max_spaces;
        }
      }
    }
    this.onDeselectReservable.emit();
  }

  onReservableSelected(reservable: Reservable) {
    if (reservable !== undefined && this.editorOptions.isDirty) this.savePlan();
    this.onSelectReservable.emit(reservable);
  }

  loadPlan() {
    this.editorOptions.nextId = 0;
    let entities: Entity[] = this.unitService.getEntities(this.plan);
    let reservables: Reservable[] = this.unitService.getReservables();
    for (var entity of entities) {
      const vertices = JSON.parse(entity.vertices);
      let outOfBounds = false;
      for (var vertex of vertices) {
        if (vertex.x >= this.plan.width || vertex.y >= this.plan.height) {
          outOfBounds = true;
          continue;
        }
        this.grids[vertex.y][vertex.x].type[vertex.d] = entity.type;
        this.grids[vertex.y][vertex.x].data = entity.data;
        this.grids[vertex.y][vertex.x].isDirty[0] = true;
        this.grids[vertex.y][vertex.x].isDirty[1] = true;
        this.grids[vertex.y][vertex.x].isDirty[2] = true;
        if (entity.type === Entity_Type.Table) {
          this.grids[vertex.y][vertex.x].runtimeId = this.editorOptions.nextId;
          this.grids[vertex.y][vertex.x].reservableData = reservables.find(
            (r) => r.id === entity.reservable_id
          );
        }
      }
      if (!outOfBounds && entity.type === Entity_Type.Table) {
        this.editorOptions.nextId++;
      }
    }
    console.log('Plan loaded.');
  }

  savePlan() {
    const entities: Entity[] = [];
    const tables = [];

    const wall: Entity = new Entity(this.plan.id);
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
            const entity: Entity = new Entity(this.plan.id);
            entity.type = this.grids[y][x].type[d];
            entity.data = this.grids[y][x].data;
            const vertices = [{ x: x, y: y, d: d }];
            entity.vertices = JSON.stringify(vertices);
            entities.push(entity);
          } else if (this.grids[y][x].type[d] === Entity_Type.Table) {
            const table = {
              x: x,
              y: y,
              id: this.grids[y][x].runtimeId,
              data: this.grids[y][x].data,
              reservableData: this.grids[y][x].reservableData,
            };
            tables.push(table);
          }
        }
      }
      this.editorOptions.isDirty = false;
      console.log('Plan saved.');
    }

    const tableGroups = this.groupBy(tables, 'id');
    const keys = Object.keys(tableGroups);
    for (let i = 0; i < keys.length; i++) {
      const tableGroup: Entity = new Entity(this.plan.id);
      const key: string = keys[i].toString();
      if (tableGroups[key][0].reservableData.id === -1) {
        // Új Reservable tényleges létrehozhása, visszakapjuk a DB id-t
        tableGroups[key][0].reservableData = this.unitService.createReservable(
          tableGroups[key][0].reservableData
        );
      } else {
        // Reservable DB módosítása
        this.unitService.updateReservable(tableGroups[key][0].reservableData);
      }
<<<<<<< HEAD
      // TODO fix me: tableGroup.reservable = tableGroups[key][0].reservableData;
=======
      tableGroup.reservable_id = tableGroups[key][0].reservableData.id;
>>>>>>> origin/frontend-integration
      tableGroup.type = Entity_Type.Table;
      tableGroup.data = tableGroups[key][0].data;
      const vertices = [];
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

    // A Planhez tartozó összes Entity-t "kihajítja", és újakat hoz létre a jelenleg mentett Plan alapán;
    // így nem kell kezelni multigrid-entity-ket binding szinten, és mindig konzisztens az Entities tábla mentés után.
    // A "kihajított" és újraírt Entity-k adatainak perzisztenciájáért pedig az Editor felel.
    // Mentés után egy Plan összes Entity-je egymás után található a táblában, így akár az indexelést is meg lehetne könnyíteni stb.
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

  setGridsDirty() {
    GridEditorComponent.setDirty_all(this.grids);
  }

  public static setDirty_all(grids: Grid[][]) {
    for (let y = 0; y < grids.length; y++) {
      for (let x = 0; x < grids[y].length; x++) {
        grids[y][x].isDirty[0] = true;
        grids[y][x].isDirty[1] = true;
        grids[y][x].isDirty[2] = true;
      }
    }
  }
}
