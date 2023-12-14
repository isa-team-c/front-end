import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { Router } from '@angular/router';

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
}
