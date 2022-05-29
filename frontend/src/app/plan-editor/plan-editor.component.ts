import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';

import { AuthService } from '../core/auth.service';
import { Floor_Plan } from '../core/model/floor_plan';
import { Reservable } from '../core/model/reservable';
import { Unit } from '../core/model/unit';
import { UnitService } from '../core/unit.service';
import { GridEditorComponent } from '../grid-editor/grid-editor.component';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.scss'],
})
export class PlanEditorComponent implements OnInit {
  @ViewChild('grid_editor') gridEditor!: GridEditorComponent;

  unit?: Unit;
  plan?: Floor_Plan;
  reservable?: Reservable;

  planSizeForm: FormGroup = this.formBuilder.group({
    width: [
      this.plan?.width,
      [
        Validators.required,
        Validators.min(6),
        Validators.max(20),
        CustomPlanValidators.isNumbers,
      ],
    ],
    height: [
      this.plan?.height,
      [
        Validators.required,
        Validators.min(6),
        Validators.max(20),
        CustomPlanValidators.isNumbers,
      ],
    ],
  });

  reservableEditorForm: FormGroup = this.formBuilder.group({
    name: [this.reservable?.name, [Validators.required]],
    minSpaces: [
      this.reservable?.minSpaces,
      [Validators.required, Validators.min(1), CustomPlanValidators.isNumbers],
    ],
    maxSpaces: [
      this.reservable?.maxSpaces,
      [Validators.required, Validators.min(1), CustomPlanValidators.isNumbers],
    ],
    minTime: [this.reservable?.minTime, [Validators.required]],
    maxTime: [this.reservable?.maxTime, [Validators.required]],
    timeStep: [this.reservable?.timeStep, [Validators.required]],
  });

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    const unitId = this.route.snapshot.paramMap.get('unitId');
    if (unitId) {
      this.unit = await this.unitService.getUnit(Number(unitId));
      this.plan = await this.unitService.getUnitPlan(this.unit!);
    }
    await this.planSizeForm.setValue({
      width: this.plan?.width,
      height: this.plan?.height,
    });
  }

  get width(): FormControl {
    return this.planSizeForm.get('width') as FormControl;
  }

  get height(): FormControl {
    return this.planSizeForm.get('height') as FormControl;
  }

  changePlanSize() {
    if (!this.planSizeForm.valid) {
      return;
    }
    this.plan!.width = this.planSizeForm.controls['width'].value;
    this.plan!.height = this.planSizeForm.controls['height'].value;
    this.gridEditor.initGrids();
    this.gridEditor.loadPlan();
  }

  changeReservable() {
    if (!this.reservableEditorForm.valid) {
      return;
    }
    this.reservable!.name = this.reservableEditorForm.controls['name'].value;
    this.reservable!.minSpaces =
      this.reservableEditorForm.controls['minSpaces'].value;
    this.reservable!.maxSpaces =
      this.reservableEditorForm.controls['maxSpaces'].value;
    // A minTime, maxTime, timeStep egyelőre nem frissíthető, majd ha a fontosabb részek mind működnek,
    // még lehet ezzel foglalkozni.
    this.unitService.updateReservable(this.reservable!);
  }

  onReservableSelected(reservable: Reservable) {
    console.log(reservable);
    this.reservable = reservable;
    if (this.reservable === undefined) return;
    this.reservableEditorForm.setValue({
      name: this.reservable.name,
      minSpaces: this.reservable.minSpaces,
      maxSpaces: this.reservable.maxSpaces,
      minTime: this.timeToString(this.reservable.minTime),
      maxTime: this.timeToString(this.reservable.maxTime),
      timeStep: this.timeToString(this.reservable.timeStep),
    });
  }

  onReservableDeselected() {
    this.reservable = undefined;
  }

  timeToString(time: Time): string {
    return (
      ('00' + time.hours).slice(-2) + ':' + ('00' + time.minutes).slice(-2)
    );
  }
}

export class CustomPlanValidators {
  static isNumbers(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    return String(control.value).match(/^[0-9]+$/) ? null : { isNumbers: true };
  }
}
