import { Time } from '@angular/common';

export interface OpeningHours {
  id: number;
  unit_id: number;
  //reservable_id: number;
  day_from: number;
  day_to: number;
  specific_date_from?: Date;
  specific_date_to?: Date;
  time_from: Time;
  time_to: Time;
}
