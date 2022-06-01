import { Injectable } from '@angular/core';
import { Reservation, ReservationPostData } from './model/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  reservations: Reservation[] = [];

  getReservations() {
    console.log(this.reservations);
    return this.reservations;
  }

  getReservationsByReservable(reservable_id: number) {
    return this.reservations.filter((r) => r.reservable_id === reservable_id);
  }

  createReservation(postData: ReservationPostData) {
    const reservation: Reservation = {
      id: this.reservations.length + 1,
      user_id: postData.user_id,
      unit_id: postData.unit_id,
      reservable_id: postData.reservable_id,
      reserved_on: postData.reserved_on,
      date: postData.date,
      start_time: postData.start_time,
      end_time: postData.end_time,
      status: 'pending',
    };
    this.reservations.push(reservation);
    console.log(this.reservations);
    return reservation;
  }

  updateReservation(reservation: Reservation) {
    const reservationId: number = this.reservations.findIndex(
      (r) => r.id === reservation.id
    );
    if (reservationId === 0) return;
    this.reservations.splice(reservationId, 1, reservation);
  }

  deleteReservation(reservation: Reservation) {
    this.reservations.splice(
      this.reservations.findIndex((r) => r.id === reservation.id),
      1
    );
  }
}
