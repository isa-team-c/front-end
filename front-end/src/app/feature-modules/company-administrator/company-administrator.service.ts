import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { Appointment } from 'src/app/infrastructure/auth/model/appointment.model';
import { Reservation } from '../company/model/reservation.model';
import { Profile } from '../user/model/profile.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Equipment } from '../user/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdministratorService {

  constructor(private http: HttpClient,
    private router: Router) { }

    create(companyAdministrator: CompanyAdministrator): Observable<any> {
      console.log("Creating company administrator: ", companyAdministrator);
  
      return this.http.post('http://localhost:8080/api/companyAdministrator/create', companyAdministrator)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError("Failed to create company administrator");
        })
      );
    }

    updateCompanyAdministrator(companyAdministrator: CompanyAdministrator): Observable<CompanyAdministrator> {
      return this.http.put<CompanyAdministrator>('http://localhost:8080/api/companyAdministrator/update', companyAdministrator);
    }

    getCompanyAdministrator(id: number): Observable<CompanyAdministrator> {
      return this.http.get<CompanyAdministrator>('http://localhost:8080/api/companyAdministrator/' + id);
    }

    /*
    createAppointment(appointment : Appointment, adminId: number): Observable<Appointment> {
      return this.http.post<Appointment>(`http://localhost:8080/api/appointments/create/${adminId}`,appointment);
    }
    */
    createAppointment(appointment : Appointment, adminId: number): Observable<Appointment> {
      return this.http.post<Appointment>(`http://localhost:8080/api/appointments/create/${adminId}`,appointment);
    }

   
    getCompanyAdministratorByUserId(userId: number): Observable<CompanyAdministrator> {
      return this.http.get<CompanyAdministrator>(`http://localhost:8080/api/companyAdministrator/user/${userId}`);
    }

    updateCompanyAdministratorForPassword(administrator: CompanyAdministrator): Observable<any> {
      console.log("admin kog dobijam: ", administrator);
      return this.http.put('http://localhost:8080/api/companyAdministrator/updateForPassword', administrator)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError("Failed to update administrator");
        })
      );
    }

    saveGeneratedAppointment(appointmentDto: Appointment): Observable<Appointment> {
      return this.http.post<Appointment>(`http://localhost:8080/api/appointments/generated`, appointmentDto)
        
    }

    saveAppointment(appointmentDto: Appointment): Observable<Appointment> {
      return this.http.post<Appointment>(`http://localhost:8080/api/appointments/generatedAppointment`, appointmentDto)
        
    }


    // qr code
    uploadQRCodeImage(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post(`http://localhost:8080/api/qrcode/upload`, formData, { responseType: 'text' });
    }

    getUserById(id: number): Observable<Profile> {
      return this.http.get<Profile>('http://localhost:8080/user/' + id);
    }

    getRegularUserByUserId(userId: number): Observable<Profile> {
      return this.http.get<Profile>('http://localhost:8080/api/regular/by-user-id/' + userId);
    }

    updateRegularUser(regularUser: Profile): Observable<Profile> {
      return this.http.put<Profile>(`http://localhost:8080/api/regular/update`, regularUser);
    }

    getReservationById(id: number): Observable<Reservation> {
      return this.http.get<Reservation>('http://localhost:8080/api/reservation/' + id);
    }

    updateReservationStatus(reservation: Reservation): Observable<Reservation> {
      return this.http.put<Reservation>('http://localhost:8080/api/reservation/updateStatus', reservation);
    }

    sendReceiveConfirmation(user: User) {
      const requestBody = user;
      return this.http.post('http://localhost:8080/user/auth/sendConfirmation/', requestBody);
    }

    getEquipmentById(equipmentId: number): Observable<Equipment> {
      return this.http.get<Equipment>(`http://localhost:8080/api/equipment/${equipmentId}`);
    }

    updateEquipment(equipment: Equipment): Observable<Equipment> {
      return this.http.put<Equipment>(`http://localhost:8080/api/equipment/update`, equipment);
    }
}


