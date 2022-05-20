import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Floor_Plan } from '../core/model/floor_plan';
import { Unit } from '../core/model/unit';
import { UnitService } from '../core/unit.service';
import { GridEditorComponent } from '../grid-editor/grid-editor.component';

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.scss'],
})
export class PlanEditorComponent implements OnInit {
  @ViewChild('grid_editor') gridEditor!: GridEditorComponent;

  unit?: Unit;
  plan?: Floor_Plan;

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

  constructor(
    public authService: AuthService,
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
