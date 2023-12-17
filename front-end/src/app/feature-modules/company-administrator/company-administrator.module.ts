import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyAdministratorComponent } from './create-company-administrator/create-company-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyAdministratorUpdateComponent } from './company-administrator-update/company-administrator-update.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';

//kalendar
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    CreateCompanyAdministratorComponent,
    CompanyAdministratorUpdateComponent,
    WorkCalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ]
})
export class CompanyAdministratorModule { }
