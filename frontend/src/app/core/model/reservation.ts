export interface Reservation {
  id:	number;
  user_id:	number;
  reservable_id:	number;
  reserved_on:	string;
  start_time:	string;
  end_time:	string;
  status: string;
}

export interface ReservationPostData {
  user_id:	number;
  reservable_id:	number;
  reserved_on:	string;
  start_time:	string;
  end_time:	string;
}
