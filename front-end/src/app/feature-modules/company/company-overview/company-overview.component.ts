import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';
import { Appointment } from '../model/appointment.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

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
  selectedEquipmentIds: number[] = [];
  showAppointments: boolean = false;
  isSelected?: boolean;
  selectedAppointment: Appointment | null = null;
  userId: number | undefined;
  
  isAdmin!: boolean;

  constructor(private route: ActivatedRoute, private service: CompanyService, private authService: AuthService) {}

  ngOnInit(): void{
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.userId = user.id;
       this.isAdmin = user.role.name === 'COMPANY_ADMIN';
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
    this.loadAppointments();
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



// ...

chooseEquipment(equipment: Equipment) {
  if (this.selectedEquipmentIds.includes(equipment.id)) {
    // Ako je oprema već izabrana, poništi izbor
    equipment.isSelected = false;
    this.selectedEquipmentIds = this.selectedEquipmentIds.filter(
      (id) => id !== equipment.id
    );
  } else {
    // Dodaj ID opreme u izabrane
    equipment.isSelected = true;
    this.selectedEquipmentIds.push(equipment.id);
  }

  this.showAppointments = this.selectedEquipmentIds.length > 0;
  }

// ...

chooseAppointment(appointment: Appointment) {
  // Ako je već izabran isti termin, poništi izbor
  if (this.selectedAppointment === appointment) {
    appointment.isSelected = false;
    this.selectedAppointment = null;
  } else {
    // Ako je već izabran drugi termin, ne dozvoli izbor
    if (this.selectedAppointment) {
      return;
    }

    appointment.isSelected = true;
    this.selectedAppointment = appointment;
    console.log('selectedAppointment',this.selectedAppointment)
  }

  // Onemogući ostale termine
  this.companyAppointments.forEach((a) => {
    if (a !== appointment) {
      a.isSelected = false;
    }
  });
}

reserveEquipment() {
  if (this.selectedEquipmentIds.length > 0 && this.selectedAppointment) {
    if (!this.selectedAppointment.isFree) {
      alert('The selected appointment is not free. Please choose another appointment.');
      return;
    }
    this.service
      .reserveEquipment(
        this.selectedEquipmentIds,
        this.selectedAppointment!.id,
        this.userId!
      )
      .subscribe(
        (response) => {
          alert('Equipment reserved successfully');
        },
        (error) => {
          alert('Error reserving equipment: ' + error.message);
        }
      );
  } else {
    alert('No equipment selected for reservation.');
  }
}

formatDate(date: Date | number[] | string): string {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (Array.isArray(date)) {
    dateObj = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
  } else {
    dateObj = new Date(date);
  }
  
  // Proverite da li je dateObj validan Date objekat
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date:', date);
    return ''; 
  }

  return dateObj.toISOString();
}


 
  
}