import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { Reservation } from './model/reservation.model';
import { Appointment } from './model/appointment.model';
import { Equipment } from '../user/model/equipment.model';
import { EquipmentQuantity } from './model/equipmentQuantity.model';

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
    return this.http.get<Company>('http://localhost:8080/company/' + id);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>('http://localhost:8080/company/update', company);
  }

  getCompanyForAdministrator(administratorId: number): Observable<Company> {
    return this.http.get<Company>(`http://localhost:8080/company/company-for-admin/${administratorId}`);
  }

  getAllEquipmentByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/company/${companyId}/equipment`);
  }



  createEquipment(equipment : Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`http://localhost:8080/api/equipment/create`,equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>('http://localhost:8080/api/equipment/update', equipment);
  }
  
  getEquipmentById(equipmentId: number): Observable<Equipment> {
    return this.http.get<Equipment>(`http://localhost:8080/api/equipment/${equipmentId}`);
  }

  deleteEquipment(equipmentId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/equipment/${equipmentId}`);
      
  }
 
  getOneCompany(id: number): Observable<Company> {
    return this.http.get<Company>('http://localhost:8080/company/get/'+ id);
  }

 

  getAllAppointmentsByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/company/${companyId}/appointments`);
  }

  reserveEquipment(reservationRequests: EquipmentQuantity[], appointmentId: number, userId: number): Observable<Reservation> {
  
    return this.http.post<Reservation>(`http://localhost:8080/api/reservation/reserveEquipment/${appointmentId}/${userId}`, reservationRequests);

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

  async createAndReserveAppointment(appointment: Appointment, reservationRequests: EquipmentQuantity[], userId: number): Promise<any> {
    try {
      const createdAppointment = await this.http.post<any>('http://localhost:8080/api/appointments/generated', appointment).toPromise();
  

      if (createdAppointment && createdAppointment.id) {
        // Sačekajte da se kreira sastanak pre nego što pređete na rezervaciju opreme.
        await this.reserveEquipment(reservationRequests, createdAppointment.id, userId).toPromise();
        
        // Možete dodati dodatnu logiku koja će se izvršiti nakon uspešne rezervacije opreme.
      } else {
        console.error('Neuspešan zahtev za kreiranje sastanka.');
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom kreiranja sastanka ili rezervacije opreme:', error);
      alert('Unfortunately, the appointment you are trying to schedule is no longer available.');
      // Ovde možete rukovati greškom ili je proslediti dalje.
    }}
    
  deleteEquipmentByCompanyIdAndEquipmentId(companyId: number, equipmentId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/company/${companyId}/equipment/${equipmentId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError("Failed to delete equipment");
        })
      );
  }

  addEquipmentToCompany(companyId: number, equipment: Equipment): Observable<Company> {
    return this.http.post<Company>(`http://localhost:8080/company/${companyId}/add-equipment`, equipment);
  }

  addEquipmentForCompany(companyId: number, equipment: Equipment): Observable<Company> {
    return this.http.post<Company>(`http://localhost:8080/api/equipment/${companyId}/addToCompany`, equipment);
  }
  

}
