import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../user/model/equipment.model';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Appointment } from 'src/app/infrastructure/auth/model/appointment.model';

@Component({
  selector: 'app-equipment-overview-for-company',
  templateUrl: './equipment-overview-for-company.component.html',
  styleUrls: ['./equipment-overview-for-company.component.css']
})
export class EquipmentOverviewForCompanyComponent {
  companyEquipment: Equipment[] = [];
  company!: Company;
  companyId!: number;
  selectedEquipment: Equipment | null = null;
  isSelected?: boolean;
  userId: number | undefined;

  constructor(private route: ActivatedRoute, private service: CompanyService, private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.userId = user.id;
      }
    })
  
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
        this.companyEquipment = data.map(equipment => ({ ...equipment, isSelected: false }));
      },
      (error) => {
        console.error('Error loading equipment:', error);
      }
    );
  }
  
  navigateToCreateEquipmentPage() {
    this.router.navigate(['/create-equipment']);
}

navigateToUpdateEquipment(equipment: Equipment): void {
  if (equipment.id) {
      this.router.navigate(['/update-equipment', equipment.id]);
  } else {
      console.error('ID opreme nije definisan.');
  }
}

deleteEquipment(equipmentId: number) {
  this.service.deleteEquipmentByCompanyIdAndEquipmentId(this.companyId, equipmentId).subscribe(
    () => {
      console.log('Equipment deleted successfully.');
      this.loadEquipment(); // Osvežavanje tabele nakon brisanja opreme
    },
    (error) => {
      console.error(error);
      // Moguće je dodati dodatnu logiku za rukovanje greškom prilikom brisanja opreme
    }
  );
}

}

