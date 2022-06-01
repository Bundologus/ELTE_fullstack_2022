import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid } from '../core/model/grid';
import { GridCenterComponent } from '../grid-center/grid-center.component';
import { EditorOptions } from '../grid-editor/grid-editor.component';
import { GridElementComponent } from './grid-element.component';

describe('GridElementComponent', () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridElementComponent, GridCenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
    component.grid = new Grid(0, 0, false, false);
    component.editorOptions = new EditorOptions();
    component.editorOptions.selectedGrid = component.grid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
