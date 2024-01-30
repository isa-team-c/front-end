import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyAdministratorService } from '../company-administrator.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../../user/user.service';
import { Appointment } from 'src/app/infrastructure/auth/model/appointment.model';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { EMPTY, catchError, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent {
  administratorId!: number;

  creationForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
   
  });

  constructor(
    private service: CompanyAdministratorService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Pretpostavka: this.authService.user$ je Observable<User>
    this.authService.user$.pipe(
      switchMap(user => {
        if (user.id) {
          return this.service.getCompanyAdministratorByUserId(user.id);
        }
        return EMPTY;
      }),
      tap((administrator: CompanyAdministrator) => {
        this.administratorId = administrator.id; // Postavljanje ID-a administratora
      }),
      catchError(error => {
        console.error('Greška prilikom dobijanja administratora:', error);
        // Obrada greške ako je potrebno
        return EMPTY; // Vraćanje EMPTY observable u slučaju greške
      })
    ).subscribe();
  }

  onSubmit(): void {
    if (this.creationForm.valid) {
      const newAppointment: Appointment = {
        id: 0,
        companyAdministrator: { id: this.administratorId, user: this.userService.currentUser, loggedInBefore: true },
        startDate: new Date(this.creationForm.value.startDate!),
        duration: +this.creationForm.value.duration!,
        isFree: true
      };

      //this.service.saveAppointment(newAppointment)
      this.service.createAppointment(newAppointment, this.administratorId)
        .subscribe(
          () => {
            alert('Appointment created successfully!');
            
          },
          (error) => {
            console.error('Error creating appointment:', error);
            alert('Unfortunately, the appointment overlaps with an already existing appointment.')
            
          }
        );
    }
  }         

}
