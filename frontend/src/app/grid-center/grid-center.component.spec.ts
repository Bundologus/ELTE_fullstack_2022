import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Grid } from '../core/grid';

import { GridCenterComponent } from './grid-center.component';

describe('GridCenterComponent', () => {
  let component: GridCenterComponent;
  let fixture: ComponentFixture<GridCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridCenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCenterComponent);
    component = fixture.componentInstance;
    component.grid = new Grid(0, 0, false, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
