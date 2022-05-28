import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Grid } from '../core/grid';
import { Entity_Type } from '../core/model/entity';

export enum ElementType {
  Center = 0,
  Horizontal = 1,
  Vertical = 2,
  Corner = 3,
}

@Component({
  selector: 'app-grid-center',
  templateUrl: './grid-center.component.html',
  styleUrls: ['./grid-center.component.scss'],
})
export class GridCenterComponent implements OnInit {
  @Input() grid!: Grid;
  @Input() elementType!: ElementType;
  @Input() elementDir!: number;
  @Input() isSelected?: boolean;

  @Output() onHover: EventEmitter<number> = new EventEmitter();
  @Output() onCancelHover: EventEmitter<number> = new EventEmitter();
  @Output() onClick: EventEmitter<number> = new EventEmitter();

  backgroundColor!: string;

  constructor() {}

  ngOnInit(): void {
    this.backgroundColor = this.getBaseColor();
  }

  onMouseEnter() {
    this.onHover.emit(this.elementDir);
  }

  onMouseLeave() {
    this.onCancelHover.emit(this.elementDir);
  }

  onMouseClick() {
    this.onClick.emit(this.elementDir);
  }

  getBackgroundColor() {
    if (this.isSelected) return '#ff0';
    if (this.grid.isMarked[this.elementDir]) return '#0f0';
    if (this.grid.type[this.elementDir] === Entity_Type.Wall) return '#000';
    else if (this.grid.type[this.elementDir] === Entity_Type.Door)
      return '#a00';
    else if (this.grid.type[this.elementDir] === Entity_Type.Window)
      return '#44f';
    else if (this.grid.type[this.elementDir] === Entity_Type.Table)
      return '#d88';
    return this.backgroundColor;
  }

  getWidth() {
    if (
      this.elementType === ElementType.Center ||
      this.elementType === ElementType.Horizontal
    )
      return '64px';
    else
      return (this.grid.x === 0 &&
        this.elementDir !== 2 &&
        this.elementDir !== 3 &&
        this.elementDir !== 4) ||
        (this.grid.isLastX &&
          this.elementDir !== 6 &&
          this.elementDir !== 7 &&
          this.elementDir !== 8)
        ? '16px'
        : '8px';
  }

  getHeight() {
    if (
      this.elementType === ElementType.Center ||
      this.elementType === ElementType.Vertical
    )
      return '64px';
    else
      return (this.grid.y === 0 &&
        this.elementDir !== 4 &&
        this.elementDir !== 5 &&
        this.elementDir !== 6) ||
        (this.grid.isLastY &&
          this.elementDir !== 8 &&
          this.elementDir !== 1 &&
          this.elementDir !== 2)
        ? '16px'
        : '8px';
  }

  getIcon() {
    if (this.elementType === ElementType.Center) {
      if (this.grid.type[0] === Entity_Type.Table) return 'table_restaurant';
      else if (this.grid.type[0] === Entity_Type.Chair) return 'chair';
    }
    return '';
  }

  getIconColor() {
    if (this.grid.type[0] === Entity_Type.Table) return '#444';
    else if (this.grid.type[0] === Entity_Type.Chair) return '#888';
    return '#000';
  }

  getCaption() {
    if (
      this.grid.type[0] === Entity_Type.Misc &&
      this.elementType === ElementType.Center
    ) {
      return this.grid.caption !== '' && this.grid.caption !== undefined
        ? this.grid.caption
        : '(felirat)';
    } else if (
      this.grid.type[0] === Entity_Type.Table &&
      this.elementDir === 1
    ) {
      return this.grid.caption !== '' && this.grid.caption !== undefined
        ? this.grid.caption
        : '[' + this.grid.reservableData!.name + ']';
    } else if (
      this.grid.type[0] === Entity_Type.Table &&
      this.elementDir === 5
    ) {
      return '(' + this.grid.reservableData!.maxSpaces + ' szék)';
    }
    return '';
  }

  getContent() {
    if (this.elementType === ElementType.Center) {
      return this.grid.x + ';' + this.grid.y;
    }
    return '';
  }

  getBaseColor() {
    switch (this.elementType) {
      case ElementType.Center:
        return '#fff';
      case ElementType.Horizontal:
      case ElementType.Vertical:
        return '#eee';
      case ElementType.Corner:
        return '#ddd';
    }
  }
}
