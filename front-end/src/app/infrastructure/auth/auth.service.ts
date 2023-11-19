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

  /*verifyUser(id: number) {
    this.http.put(`http://localhost:8080/user/verify/${id}`, {})
      .subscribe(
        (response) => {
          console.log('Verification successful:', response);
          //this.router.navigate(['home']);
        },
        (error) => {
          console.error('Verification failed:', error);
        }
      );
  }*/
  async verifyUser(id: number): Promise<void> {
    try {
      const response = await this.http.put(`http://localhost:8080/user/verify/${id}`, {}).toPromise();
      console.log('Verification successful:', response);
       this.router.navigate(['home']);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }

}
