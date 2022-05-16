import { Component, Input, OnInit } from '@angular/core';
import { Grid } from '../core/grid';

@Component({
  selector: 'app-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
})
export class GridElementComponent implements OnInit {
  @Input() grid!: Grid;

  backgroundColor: string = '#fff';

  constructor() {}

  ngOnInit(): void {}

  onMouseEnter() {
    console.log('onMouseEnter: ' + this.grid.x + ';' + this.grid.y);
    this.backgroundColor = '#0f0';
  }

  onMouseLeave() {
    console.log('onMouseLeave');
    this.backgroundColor = '#fff';
  }

  onMouseClick() {
    this.grid.wallTop = !this.grid.wallTop;
  }

  getWallTop() {
    return this.grid.wallTop ? 'solid black 1px' : 'solid white 1px';
  }

  getWallLeft() {
    return this.grid.wallLeft ? 'solid black 1px' : 'solid white 1px';
  }

  getWallBottom() {
    return this.grid.wallBottom ? 'solid black 1px' : 'solid white 1px';
  }

  getWallRight() {
    return this.grid.wallRight ? 'solid black 1px' : 'solid white 1px';
  }
}
