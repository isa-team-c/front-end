import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/complaint/all`);
  }
}
