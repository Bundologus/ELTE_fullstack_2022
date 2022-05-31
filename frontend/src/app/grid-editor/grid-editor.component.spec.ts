import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitService } from '../core/unit.service';
import { GridCenterComponent } from '../grid-center/grid-center.component';
import { GridEditorComponent } from './grid-editor.component';
import { GridElementComponent } from '../grid-element/grid-element.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

/*
describe('GridEditorComponent', () => {
  let component: GridEditorComponent;
  let fixture: ComponentFixture<GridEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridEditorComponent,
        GridElementComponent,
        GridCenterComponent,
      ],
    }).compileComponents();
  });

  beforeEach((unitService = new UnitService()) => {
    fixture = TestBed.createComponent(GridEditorComponent);
    component = fixture.componentInstance;
    component.plan = unitService.plans[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
