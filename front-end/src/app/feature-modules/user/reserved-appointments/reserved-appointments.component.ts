import { Component } from '@angular/core';
import { Appointment } from '../../company/model/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reserved-appointments',
  templateUrl: './reserved-appointments.component.html',
  styleUrls: ['./reserved-appointments.component.css']
})
export class ReservedAppointmentsComponent {
  userId: number | undefined;
  userAppointments: Appointment[] = [];

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
}
