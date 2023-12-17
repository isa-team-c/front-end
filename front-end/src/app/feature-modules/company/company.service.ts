import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';
import { Equipment } from '../user/model/equipment.model';

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
