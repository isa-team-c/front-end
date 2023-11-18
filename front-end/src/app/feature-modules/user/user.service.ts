import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Profile } from './model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>('http://localhost:8080/api/regular/' + id);
  }

  updateUserProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>('http://localhost:8080/api/regular/update', profile);
  }
}
