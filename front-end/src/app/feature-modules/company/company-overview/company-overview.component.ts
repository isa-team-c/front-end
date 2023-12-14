import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent {
  companyEquipment: Equipment[] = [];
  companyAppointments: Appointment[] = [];
  company!: Company;
  companyId!: number;

  constructor(private route: ActivatedRoute, private service: CompanyService) {}

  ngOnInit(): void{
    this.route.paramMap.subscribe((params) => {
      const companyId = params.get('id');
      if (companyId) {
          this.companyId = +companyId; 
          this.service.getCompany(this.companyId).subscribe((company) => {
              this.company = company;
          });
        }
    })
    this.loadEquipment();
    this.loadAppointments();
  }

  loadEquipment() {
    this.service.getAllEquipmentByCompany(this.companyId).subscribe(
      (data) => {
        this.companyEquipment = data;
      },
      (error) => {
        console.error('Error loading equipment:', error);
      }
    );
  }

  loadAppointments() {
    this.service.getAllAppointmentsByCompany(this.companyId).subscribe(
      (data) => {
        this.companyAppointments = data;
      },
      (error) => {
        console.error('Error loading appointments:', error);
      }
    );
  }
  
}
