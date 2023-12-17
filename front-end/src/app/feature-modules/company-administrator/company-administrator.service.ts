import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { Appointment } from 'src/app/infrastructure/auth/model/appointment.model';

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
}


