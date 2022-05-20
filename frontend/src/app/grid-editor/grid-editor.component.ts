import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Grid } from '../core/grid';
import { Floor_Plan } from '../core/model/floor_plan';

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
  paintTool: string = 'walls';

  constructor() {}

  ngOnInit(): void {
    this.initGrids();
  }

  initGrids() {
    this.cols = this.plan.width;
    this.rows = this.plan.height;
    this.grids = [];
    for (let y = 0; y < this.rows; y++) {
      const columns: Grid[] = [];
      for (let x = 0; x < this.cols; x++) {
        columns.push(new Grid(x, y, x == this.cols - 1, y == this.rows - 1));
      }
      this.grids.push(columns);
    }
  }

  onChangePaintTool(change: MatButtonToggleChange) {
    this.paintTool = change.value;
  }
}
