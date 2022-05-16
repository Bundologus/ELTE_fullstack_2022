import { Component, OnInit } from '@angular/core';
import { Grid } from '../core/grid';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
})
export class GridEditorComponent implements OnInit {
  cols!: number;
  rows!: number;
  grids!: Grid[][];

  constructor() {}

  ngOnInit(): void {
    this.initGrids(20, 12);
  }

  initGrids(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.grids = [];
    for (let y = 0; y < rows; y++) {
      const columns: Grid[] = [];
      for (let x = 0; x < cols; x++) {
        columns.push(new Grid(x, y));
      }
      this.grids.push(columns);
    }
  }
}
