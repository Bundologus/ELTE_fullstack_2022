export interface Country {
  id: number;
  name:	string;
}

export interface City {
  id: number;
  country_id: number;
  name:	string;
  post_code: string;
}

export interface District {
  id: number;
  city_id: number;
  name:	string;
  post_code: string;
}
