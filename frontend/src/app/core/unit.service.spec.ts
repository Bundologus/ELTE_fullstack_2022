import { TestBed } from '@angular/core/testing';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  let service: UnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('should properly delete a unit', () => {
    let l: number = service.getUnits().length;
    if (l > 0) {
      service.deleteUnit(1);
      expect(service.getUnits().length).toEqual(l - 1);
    } else {
      expect(service.getUnits().length).toEqual(0);
    }
  });
  */
});
