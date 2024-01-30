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
    this.complaintService.getAllNotRespondedComplaints().subscribe(
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
    const user: User = complaint.userDto;
  
    if (responseText && user) {
      // Update the complaint locally
      complaint.responded = true;
      console.log("Complaint after responding", complaint);
  
      // Call the service to update the complaint on the server
      this.complaintService.updateComplaint(complaint).subscribe(
        (updatedComplaint) => {
          // The complaint is updated on the server
          console.log('Complaint updated successfully:', updatedComplaint);
  
          // Now, proceed to send the email response
          this.complaintService.sendResponse(user, responseText).subscribe(
            (response) => {
              // Email sent successfully
              alert('Response has been sent via mail!');
              
              // Now, refresh the page
              this.refreshPage();
            },
            (error) => {
              // Handle error if the response fails to send
              console.error('Error sending response:', error);
            }
          );
        },
        (error) => {
          // Handle error if the complaint update fails
          console.error('Error updating complaint:', error);
        }
      );
    }
  }
  
  refreshPage() {
    // You can reload the complaints here or call any other necessary function
    this.loadComplaints();
  }
}
