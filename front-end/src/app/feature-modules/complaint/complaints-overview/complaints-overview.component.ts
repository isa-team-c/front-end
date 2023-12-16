import { Component } from '@angular/core';
import { Complaint } from 'src/app/infrastructure/auth/model/complaint.model';
import { ComplaintService } from '../complaint.service';

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
}
