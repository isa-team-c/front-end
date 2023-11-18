import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Registration } from './model/registration.model';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './model/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router) { }


  register(user: User): Observable<any> {
    console.log('Registering user:', user);
    
    return this.http.post('http://localhost:8080/user/register', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError("Failed to register user");
        })
      );
  }

}
