import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';
import { Appointment } from '../model/appointment.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent {
  companyEquipment: Equipment[] = [];
  companyAppointments: Appointment[] = [];
  generatedAppointments: Appointment[] = [];
  company!: Company;
  companyId!: number;
  selectedEquipmentIds: number[] = [];
  showAppointments: boolean = false;
  isSelected?: boolean;
  selectedAppointment: Appointment | null = null;
  userId: number | undefined;
  user: User | undefined;
  
  isAdmin!: boolean;
  isLogged!: boolean;
  shouldRenderNewAppointment: boolean = false;
  selectedDateTime!: Date;
  shouldRenderGeneratedAppointments: boolean = false;
  selectedGeneratedAppointment: Appointment | null = null;

  constructor(private route: ActivatedRoute, private service: CompanyService, private authService: AuthService, private router: Router) {}

  appointmentForm = new FormGroup({
    appointmentDate: new FormControl('', [Validators.required]),
    appointmentTime: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void{
    this.authService.user$.subscribe(user => {
      if (user.id != 0) {
       this.userId = user.id;
       this.isAdmin = user.role.name === 'ROLE_COMPANY_ADMIN';
       this.isLogged = true;
       if(this.isAdmin){
        this.showAppointments = true;
       }
      }
    })
    this.route.paramMap.subscribe((params) => {
      const companyId = params.get('id');
      if (companyId) {
          this.companyId = +companyId; 
          this.service.getOneCompany(this.companyId).subscribe((company) => {
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
          this.loadEquipment();
          this.loadAppointments();
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


 
  

newAppointment(){
  this.shouldRenderNewAppointment = !this.shouldRenderNewAppointment;
}

onCloseClicked(): void {
  this.shouldRenderNewAppointment = !this.shouldRenderNewAppointment;
}

onSaveAppointmentDateTime(): void {
  if (this.appointmentForm.valid && this.company) {
    const selectedDate = this.appointmentForm.value.appointmentDate;
    const selectedTime = this.appointmentForm.value.appointmentTime;

    // Check if selectedDate and selectedTime are not null or undefined
    if (selectedDate && selectedTime) {
      const dateFormat = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');

      // Set the hours and minutes to the date
      dateFormat.setHours(Number(hours));
      dateFormat.setMinutes(Number(minutes));

      // Check if the date is valid
      if (isNaN(dateFormat.getTime())) {
        console.error('Invalid date or time input.');
        return; // Exit the function early
      }

      const currentTime = new Date();
      const timeDifference = dateFormat.getTime() - currentTime.getTime();

      console.log(timeDifference);
      if (timeDifference < 0) {
        console.error('Invalid date or time input.');
        return; // Exit the function early
      }

      if (this.company && this.company.id) {
        // Update the selectedTourProblem's deadlineTimeStamp
        this.selectedDateTime = dateFormat;

        // You can proceed to use the updated selectedTourProblem as needed
        this.service.generateAppointments(this.selectedDateTime, 30, this.company.id).subscribe({
          next: (generatedAppointments) => {
            this.generatedAppointments = generatedAppointments;
          },
          error: (error) => {
            console.error('Error fetching generated appointments:', error);
          }
        });
        this.shouldRenderNewAppointment = false;
        this.shouldRenderGeneratedAppointments = true;
      } else {
        console.error('Invalid company or company ID.');
      }
    } else {
      console.error('Selected date or time is null or undefined.');
    }
  }
}

async bookAppointment(appointment: Appointment) {
  appointment.isSelected = true;
  this.selectedGeneratedAppointment = appointment;

  this.generatedAppointments.forEach((a) => {
    if (a !== appointment) {
      a.isSelected = false;
    }
  });

  if (this.selectedEquipmentIds.length > 0 && this.selectedGeneratedAppointment) {
    try {
      await this.service.createAndReserveAppointment(
        this.selectedGeneratedAppointment,
        this.selectedEquipmentIds,
        this.userId!
      );

      console.log('Equipment reservation successfully created.');
      this.router.navigate(['/reserved-appointments']);
    } catch (error) {
      console.error('Error reserving equipment:', error);
    }
  } else {
    console.warn('No equipment selected for reservation.');
  }
}

}
