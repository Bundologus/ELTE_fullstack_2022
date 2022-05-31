import { Time } from '@angular/common';
import { City, Country, District } from './address';
import { FloorPlan } from './floorPlan';
import { OpeningHours } from './openingHours';
import { User } from './user';

export interface Unit {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  //country: Country;
  //city: City;
  //district: District;
  description: string;
  //profile_picture?: string;
  //reservation_terms: string;
  default_min_time: Time;
  default_max_time: Time;
  default_time_step: Time;
  opening_hours: OpeningHours[];
  floor_plan: FloorPlan;
}

export interface CondensedUnit {
  id: number;
  owner: User; // WIP -- kell az UserService.isOwner-nek
  name: string;
  address: string;
  description: string;
  //profile_picture: string;
}

export interface PostUnitData {
  owner_id: number;
  name: string;
  address: string;
  //country_id: number;
  //city_id: number;
  //district_id?: number;
  description: string;
  //profile_picture?: File;
  //reservation_terms: string;
  default_min_time: Time;
  default_max_time: Time;
  default_time_step: Time;
}
