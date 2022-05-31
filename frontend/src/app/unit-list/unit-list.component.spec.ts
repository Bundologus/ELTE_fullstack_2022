import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAccordion } from '@angular/material/expansion';
import { RouterTestingModule } from '@angular/router/testing';

import { UnitListComponent } from './unit-list.component';

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UnitListComponent, MatAccordion],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
