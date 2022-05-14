import { Time } from '@angular/common';
import { MockUsers, User } from './user';

export interface Unit {
  owner: User;
  id?: string;
  name?: string;
  countryId?: number;
  cityId?: number;
  districtId?: number;
  description?: string;
  profilePicture?: string;
  reservationTerms?: string;
  defaultMinTime?: Time;
  defaultMaxTime?: Time;
  defaultTimeStep?: Time;
}

export abstract class MockUnits {
  public static units: Unit[] = [
    {
      owner: MockUsers.users[0],
      name: 'Süsü konyhája',
      description: 'Mesebeli magyar ételek',
    },
    {
      owner: MockUsers.users[1],
      name: 'Gyors Gyros',
      description: 'A pitába!',
    },
  ];
}
