import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  units: Unit[] = [
    {
      id: '1',
      owner: AuthService.users[0],
      name: 'Süsü konyhája',
      shortDesc: 'hagyományos magyar',
      description: 'Mesebeli magyar ételek',
    },
    {
      id: '2',
      owner: AuthService.users[1],
      name: 'Gyors Gyros',
      shortDesc: 'görög, közel-keleti',
      description: 'A pitába!',
    },
  ];

  constructor() {}

  getUnit(unitId: string) {
    return this.units.find((u) => u.id === unitId);
  }

  getUnits() {
    return this.units;
  }
}
