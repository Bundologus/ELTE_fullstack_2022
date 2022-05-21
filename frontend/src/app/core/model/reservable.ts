import { Time } from '@angular/common';

export interface Reservable {
  id?: number;
  name: string;
  minSpaces: number;
  maxSpaces: number;
  minTime: Time;
  maxTime: Time;
  timeStep: Time;
}
