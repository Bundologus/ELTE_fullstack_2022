import { Time } from '@angular/common';
import { User } from './user';

export interface Unit {
  owner: User;
  id?: number;
  name?: string;
  countryId?: number;
  cityId?: number;
  districtId?: number;
  shortDesc?: string;
  description?: string;
  profilePicture?: string;
  reservationTerms?: string;
  defaultMinTime?: Time;
  defaultMaxTime?: Time;
  defaultTimeStep?: Time;
}
