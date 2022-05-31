import { Time } from '@angular/common';

export interface Reservation {
  id: number;
  user_id: number;
  reservable_id: number;
  reserved_on: string;
  date: Date;
  start_time: Time;
  end_time: Time;
  status: string;
}

export interface ReservationPostData {
  user_id: number;
  reservable_id: number;
  reserved_on: string;
  date: Date;
  start_time: Time;
  end_time: Time;
}
