import { Component } from '@angular/core';
import { Complaint } from 'src/app/infrastructure/auth/model/complaint.model';
import { ComplaintService } from '../complaint.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-complaints-overview',
  templateUrl: './complaints-overview.component.html',
  styleUrls: ['./complaints-overview.component.css']
})
export class ComplaintsOverviewComponent {
  complaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService) { }

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading complaints:', error);
      }
    );
  }

  responseForm = new FormGroup({
    response: new FormControl('', [Validators.required]),
  });

  onSubmit(complaint: Complaint) {
    const responseText = this.responseForm.get('response')?.value;
    const user: User = complaint.userDto; // Assuming complaint.userDto contains user information
    if (responseText && user) {
      this.complaintService.sendResponse(user, responseText).subscribe(
        (response) => {
          // Handle successful response sending
          // For example, display a success message or update the UI
          console.log('Response sent:', response);
        },
        (error) => {
          // Handle error if the response fails to send
          console.error('Error sending response:', error);
        }
      );
    }
  }
}
