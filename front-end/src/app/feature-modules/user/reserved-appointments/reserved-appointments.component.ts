import { Component } from '@angular/core';
import { Appointment } from '../../company/model/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../user.service';
import { Reservation } from '../../company/model/reservation.model';

@Component({
  selector: 'app-reserved-appointments',
  templateUrl: './reserved-appointments.component.html',
  styleUrls: ['./reserved-appointments.component.css']
})
export class ReservedAppointmentsComponent {
  userId: number | undefined;
  userAppointments: Reservation[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private service: UserService) {}

  ngOnInit(): void{
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.userId = user.id;
      }
    })

    this.loadUserAppointments();
  }

  loadUserAppointments() {
    this.service.getAllAppointmentsByUserId(this.userId!).subscribe(
      (data) => {
        this.userAppointments = data;
      },
      (error) => {
        console.error('Error loading appointments:', error);
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
