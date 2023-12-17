import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Profile } from './model/profile.model';
import { CompanyReview } from './model/company-review.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Administrator } from 'src/app/infrastructure/auth/model/administrator.model';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!:any;

  constructor(
    private http: HttpClient) { }


  getMyInfo(email: string): void {
    this.http.get<User>('http://localhost:8080/user/getByEmail/' + email)
      .subscribe(
        user => {
          console.log('Received User:', user);        
          this.currentUser = user;
          localStorage.setItem('user',JSON.stringify(this.currentUser));
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
  }
    

  getUserProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>('http://localhost:8080/api/regular/' + id);
  }

  getAdministrator(id: number): Observable<Administrator> {
    return this.http.get<Administrator>('http://localhost:8080/api/administrator/' + id);
  }

  updateUserProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>('http://localhost:8080/api/regular/update', profile);
  }

  searchCompanies(searchTerm: string): Observable<CompanyReview[]> {
    let url = 'http://localhost:8080/company/search?';
  
    if (searchTerm) {
      url += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
  
    return this.http.get<CompanyReview[]>(url);
  }
   
  getAllEquipment(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/equipment/all`);
  }

  getUserDetails(email: string): Observable<User2> {
    return this.http.get<User2>(`http://localhost:8080/user/getByEmail/${email}`);
  }

  
  getAllAppointmentsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/reservation/appointmentsByUserId/${userId}`);
  }
}
