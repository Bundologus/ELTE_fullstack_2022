import { Time } from '@angular/common';
import { OpeningHours } from './openingHours';

export interface Reservable {
  id: number;
  name: string;
  min_spaces: number;
  max_spaces: number;
  min_time: Time;
  max_time: Time;
  time_step: Time;
  opening_hours: OpeningHours[];
}
