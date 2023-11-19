import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.css']
})
export class CompaniesOverviewComponent {
  constructor(private http: HttpClient) { }

  viewCompanies() {    
    
  }
}
