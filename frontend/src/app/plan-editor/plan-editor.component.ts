import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Time } from '@angular/common';

import { AuthService } from '../core/auth.service';
import { FloorPlan } from '../core/model/floorPlan';
import { Reservable } from '../core/model/reservable';
import { Unit } from '../core/model/unit';
import { UnitService } from '../core/unit.service';
import { GridEditorComponent } from '../grid-editor/grid-editor.component';
import { UserService } from '../core/user.service';
import { ReservationService } from '../core/reservation.service';
import { Reservation } from '../core/model/reservation';
import { MatSelect, MatSelectChange } from '@angular/material/select';

interface Day {
  value: string;
  viewValue: string;
  date: Date;
}

interface TimeRange {
  value: string;
  viewValue: string;
  time: Time;
}

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.scss'],
  providers: [DatePipe],
})
export class PlanEditorComponent implements OnInit {
  @ViewChild('grid_editor') gridEditor!: GridEditorComponent;
  @ViewChild('time_selector') timeSelector!: MatSelect;

  unit?: Unit;
  plan?: FloorPlan;
  reservable?: Reservable;

  selectedDay: string = '1';
  days: Day[] = [];

  selectedTimeRange: string = '1';
  selectedTime: string = '-1';
  timeRanges: TimeRange[] = [];

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

  unitDataForm: FormGroup = this.formBuilder.group({
    name: [this.unit?.name, [Validators.required]],
    address: [this.unit?.address, [Validators.required]],
    description: [this.unit?.address, [Validators.required]],
    /*
    minTime: [this.unit?.default_min_time, [Validators.required]],
    maxTime: [this.unit?.default_max_time, [Validators.required]],
    timeStep: [this.unit?.default_time_step, [Validators.required]],
    */
  });

  reservableEditorForm: FormGroup = this.formBuilder.group({
    name: [this.reservable?.name, [Validators.required]],
    minSpaces: [
      this.reservable?.min_spaces,
      [Validators.required, Validators.min(1), CustomPlanValidators.isNumbers],
    ],
    maxSpaces: [
      this.reservable?.max_spaces,
      [Validators.required, Validators.min(1), CustomPlanValidators.isNumbers],
    ],
    minTime: [this.reservable?.min_time, [Validators.required]],
    maxTime: [this.reservable?.max_time, [Validators.required]],
    timeStep: [this.reservable?.time_step, [Validators.required]],
  });

  createReservationForm: FormGroup = this.formBuilder.group({
    selectedDay: [this.selectedDay, [Validators.required]],
    selectedTimeRange: [this.selectedTimeRange, [Validators.required]],
  });

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private unitService: UnitService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    const unitId = this.route.snapshot.paramMap.get('unitId');
    const today: Date = new Date();
    for (let i = 1; i <= 30; i++) {
      const nextDay = new Date(today.setDate(today.getDate() + 1));
      this.days.push({
        value: i.toString(),
        viewValue: this.datePipe.transform(nextDay, 'yyyy-MM-dd')!,
        date: nextDay,
      });
    }
    if (unitId) {
      this.unit = await this.unitService.getUnit(Number(unitId));
      this.plan = (await this.unitService.getUnitPlan(this.unit!)) as FloorPlan;
    }
    await this.planSizeForm.setValue({
      width: this.plan?.width,
      height: this.plan?.height,
    });
    await this.unitDataForm.setValue({
      name: this.unit!.name,
      address: this.unit!.address,
      description: this.unit!.description,
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

  changeUnit() {
    if (!this.unitDataForm.valid) {
      return;
    }
    this.unit!.name = this.unitDataForm.controls['name'].value;
    this.unit!.address = this.unitDataForm.controls['address'].value;
    this.unit!.description = this.unitDataForm.controls['description'].value;
    // A minTime, maxTime, timeStep egyelőre nem frissíthető, majd ha a fontosabb részek mind működnek,
    // még lehet ezzel foglalkozni.
  }

  changeReservable() {
    if (!this.reservableEditorForm.valid) {
      return;
    }
    this.reservable!.name = this.reservableEditorForm.controls['name'].value;
    this.reservable!.min_spaces =
      this.reservableEditorForm.controls['minSpaces'].value;
    this.reservable!.max_spaces =
      this.reservableEditorForm.controls['maxSpaces'].value;
    // A minTime, maxTime, timeStep egyelőre nem frissíthető, majd ha a fontosabb részek mind működnek,
    // még lehet ezzel foglalkozni.
    this.unitService.updateReservable(this.reservable!);
    this.gridEditor.setGridsDirty();
  }

  onReservableSelected(reservable: Reservable) {
    console.log(reservable);
    this.reservable = reservable;
    if (!this.isOwner() || this.authService.isDebugMode)
      this.updateReservationTimes();
    if (this.reservable === undefined) return;
    this.reservableEditorForm.setValue({
      name: this.reservable.name,
      minSpaces: this.reservable.min_spaces,
      maxSpaces: this.reservable.max_spaces,
      minTime: this.timeToString(this.reservable.min_time),
      maxTime: this.timeToString(this.reservable.max_time),
      timeStep: this.timeToString(this.reservable.time_step),
    });
  }

  onReservableDeselected() {
    this.reservable = undefined;
    if (!this.isOwner() || this.authService.isDebugMode)
      this.updateReservationTimes();
  }

  changeDate() {
    if (!this.isOwner() || this.authService.isDebugMode)
      this.updateReservationTimes();
  }

  changeTime(change: MatSelectChange) {
    this.selectedTime = change.value;
    console.log(this.selectedTime);
  }

  updateReservationTimes() {
    console.log('updateReservationTimes');
    this.timeRanges = [];
    if (this.reservable === undefined) return;
    const reservations: Reservation[] =
      this.reservationService.getReservationsByReservable(this.reservable!.id);
    /*
    const start_time: Time = this.unit!.opening_hours[0]!.time_from;
    const end_time: Time = this.unit!.opening_hours[0]!.time_to;
    const time_step: Time = this.unit!.default_time_step;
    let i = 1;
    for (
      let t = start_time;
      t < end_time;
      t = {
        hours: t.hours + time_step.hours,
        minutes: t.minutes + time_step.minutes,
      }
    ) {
      this.timeRanges.push({
        value: (i++).toString(),
        viewValue: t.hours.toString() + ':' + t.minutes.toString(),
        time: t,
      });
    }*/
    for (let i = 0; i < 24; i++) {
      this.timeRanges.push({
        value: i.toString(),
        viewValue: i.toString() + ':00 - ' + (i + 1).toString() + ':00',
        time: { hours: i, minutes: 0 },
      });
    }
    this.timeSelector.value = '-1';
    this.selectedTime = '-1';
  }

  createReservation() {}

  timeToString(time: Time): string {
    return (
      ('00' + time.hours).slice(-2) + ':' + ('00' + time.minutes).slice(-2)
    );
  }

  isOwner() {
    return this.unit!.owner_id === this.userService.getCurrentUser().id;
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
