import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { Reservation } from './model/reservation.model';
import { Appointment } from './model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  constructor(private http: HttpClient,
    private router: Router) { }

  create(company: Company): Observable<any> {
    console.log("Creating company: ", company);

    return this.http.post('http://localhost:8080/company/create', company)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError("Failed to create company");
      })
    );
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>('http://localhost:8080/company/get/'+ id);
  }

  getAllEquipmentByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/company/${companyId}/equipment`);
  }

  getAllAppointmentsByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/company/${companyId}/appointments`);
  }

  reserveEquipment(equipmentIds: number[], appointmentId: number, userId: number): Observable<Reservation> {
    const body = {
      equipmentIds: equipmentIds,
      appointmentId: appointmentId,
      userId: userId
    };
  
    return this.http.post<Reservation>(`http://localhost:8080/api/reservation/reserveEquipment/${equipmentIds}/${appointmentId}/${userId}`, {});

  }

  generateAppointments(selectedDateTime: Date, duration: number, companyId: number): Observable<any> {
    const url = `http://localhost:8080/api/appointments/generate`;
  
    // Format Date to string in ISO format
    const formattedDateTime = selectedDateTime.toISOString();
  
    // Create request parameters
    let params = new HttpParams()
      .set('selectedDateTime', formattedDateTime)
      .set('duration', duration.toString())
      .set('companyId', companyId.toString());
  
    return this.http.get(url, { params: params });
  }

  async createAndReserveAppointment(appointment: Appointment, equipmentIds: number[], userId: number): Promise<any> {
    try {
      const createdAppointment = await this.http.post<any>('http://localhost:8080/api/appointments/generated', appointment).toPromise();
  
      if (createdAppointment && createdAppointment.id) {
        // Sačekajte da se kreira sastanak pre nego što pređete na rezervaciju opreme.
        await this.reserveEquipment(equipmentIds, createdAppointment.id, userId).toPromise();
        
        // Možete dodati dodatnu logiku koja će se izvršiti nakon uspešne rezervacije opreme.
      } else {
        console.error('Neuspešan zahtev za kreiranje sastanka.');
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom kreiranja sastanka ili rezervacije opreme:', error);
      // Ovde možete rukovati greškom ili je proslediti dalje.
    }
  }
  
  
}
