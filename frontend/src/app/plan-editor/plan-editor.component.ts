import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Unit } from '../core/unit';
import { UnitService } from '../core/unit.service';

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.scss'],
})
export class PlanEditorComponent implements OnInit {
  unit?: Unit;

  constructor(
    public authService: AuthService,
    private unitService: UnitService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const unitId = this.route.snapshot.paramMap.get('unitId');
    if (unitId) {
      this.unit = await this.unitService.getUnit(unitId);
    }
  }
}
