import { Injectable } from '@angular/core';
import { Reservation } from './model/reservation';

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

  createReservation(reservation: Reservation) {
    reservation.id = this.reservations.length + 1;
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
