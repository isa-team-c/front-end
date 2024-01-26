import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { Appointment } from 'src/app/infrastructure/auth/model/appointment.model';
import { Reservation } from '../company/model/reservation.model';
import { Profile } from '../user/model/profile.model';

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




    // qr code
    uploadQRCodeImage(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post(`http://localhost:8080/api/qrcode/upload`, formData, { responseType: 'text' });
    }

    getUserById(id: number): Observable<Profile> {
      return this.http.get<Profile>('http://localhost:8080/user/' + id);
    }

    getReservationById(id: number): Observable<Reservation> {
      return this.http.get<Reservation>('http://localhost:8080/api/reservation/' + id);
    }

    /*
    getAppointment(id: number): Observable<Appointment> {
      return this.http.get<Appointment>('http://localhost:8080/api/appointments/' + id);
    }
    */
}


