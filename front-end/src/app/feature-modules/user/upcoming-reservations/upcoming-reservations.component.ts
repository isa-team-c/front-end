import { Component } from '@angular/core';
import { Reservation } from '../../company/model/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Appointment } from '../../company/model/appointment.model';

@Component({
  selector: 'app-upcoming-reservations',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './upcoming-reservations.component.html',
  styleUrls: ['./upcoming-reservations.component.css']
})
export class UpcomingReservationsComponent {

  userId: number | undefined;
  reservations: Reservation[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private service: UserService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user.id) {
        this.userId = user.id;
      }
    });

    this.loadReservations();
  }

  loadReservations() {
    this.service.getUpcomingReservationsByUserId(this.userId!).subscribe(
      (data) => {
        // Sort reservations before assigning
        this.reservations = data;
      },
      (error) => {
        console.error('Error loading taken reservations:', error);
      }
    );
  }

  onCancelClicked(selectedAppointment: Appointment | undefined) {
    this.service.cancelAppointment(selectedAppointment!.id, this.userId!).subscribe(
      (response) => {
        console.log('Appointment cancelled:', response);
        alert('Appointment canceled successfully!');
        this.loadReservations();
      },
      (error) => {
        console.error('Error cancelling appointment:', error);
      }
    );
  }

  formatDate(date: Date | number[] | string): Date {
    let dateObj: Date;

    if (date instanceof Date) {
      dateObj = date;
    } else if (Array.isArray(date)) {
      dateObj = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
    } else {
      dateObj = new Date(date);
    }

    // Check if dateObj is a valid Date object
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date:', date);
      return new Date(); // Return some default value, e.g., the current date
    }

    return dateObj;
  }
}
