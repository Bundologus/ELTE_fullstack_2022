import { Time } from '@angular/common';
import { User } from './user';

export interface Unit {
  id?: number;
  owner: User; // link to DTO
  name?: string;
  countryId?: number; // link to DTO, WIP
  cityId?: number; // link to DTO, WIP
  districtId?: number; // link to DTO, WIP
  shortDesc?: string;
  description?: string;
  profilePicture?: string;
  reservationTerms?: string;
  defaultMinTime?: Time;
  defaultMaxTime?: Time;
  defaultTimeStep?: Time;
}
