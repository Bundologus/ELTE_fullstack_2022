import { City, Country, District } from './address';
import { FloorPlan } from './floorPlan';
import { OpeningHours } from './openingHours';
import { User } from './user';

export interface Unit {
  id: number;
  owner: User;
  name: string;
  country: Country;
  city: City;
  district: District;
  description: string;
  profile_picture?: string;
  reservation_terms: string;
  default_min_time: string;
  defaul_max_time: string;
  default_time_step: string;
  opening_hours: OpeningHours[];
  floor_plan: FloorPlan;
}

export interface CondensedUnit {
  id: number;
  name: string;
  address: string;
  description: string;
  profile_picture: string;
}

export interface PostUnitData {
  owner_id: number;
  name: string;
  country_id: number;
  city_id: number;
  district_id?: number;
  description: string;
  profile_picture?: File;
  reservation_terms: string;
  default_min_time: string;
  defaul_max_time: string;
  default_time_step: string;
}
