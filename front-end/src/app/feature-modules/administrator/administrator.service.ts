import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Administrator } from 'src/app/infrastructure/auth/model/administrator.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient, private router: Router) { }

  create(administrator: Administrator): Observable<any> {
    console.log("Creating administrator: ", administrator);

    return this.http.post('http://localhost:8080/api/administrator/create', administrator)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError("Failed to create administrator");
      })
    );
  }

  update(administrator: Administrator): Observable<any> {
    console.log("admin kog dobijam: ", administrator);
    return this.http.put('http://localhost:8080/api/administrator/update', administrator)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError("Failed to update administrator");
      })
    );
  }
}
