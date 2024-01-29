import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/infrastructure/auth/model/complaint.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/complaint/all`);
  }

  getAllNotRespondedComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/complaint/allNotResponded`);
  }

  updateComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.put<Complaint>(`http://localhost:8080/complaint/updateResponded`, complaint);
  }
  
  sendResponse(user: User, text: string) {
    const requestBody = user; // Assuming user is a complete UserDto object
    const queryParams = { responseContent: text }; // Use text as a query parameter
    return this.http.post('http://localhost:8080/user/auth/sendResponse/', requestBody, { params: queryParams });
  }
}
