import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitService } from '../core/unit.service';

import { GridEditorComponent } from './grid-editor.component';

describe('GridEditorComponent', () => {
  let component: GridEditorComponent;
  let fixture: ComponentFixture<GridEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridEditorComponent],
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
