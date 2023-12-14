import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent {
  companyEquipment: Equipment[] = [];
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
  
}
