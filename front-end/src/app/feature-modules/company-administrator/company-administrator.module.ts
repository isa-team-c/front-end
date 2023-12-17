import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyAdministratorComponent } from './create-company-administrator/create-company-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyAdministratorUpdateComponent } from './company-administrator-update/company-administrator-update.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { ChangePasswordCompanyAdminComponent } from './change-password-company-admin/change-password-company-admin.component';
import { ChangePasswordFirstTimeComponent } from './change-password-first-time/change-password-first-time.component';

import { WorkCalendarComponent } from './work-calendar/work-calendar.component';

//kalendar
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    CreateCompanyAdministratorComponent,
    CompanyAdministratorUpdateComponent,
    AppointmentCreateComponent,
    ChangePasswordCompanyAdminComponent,
    ChangePasswordFirstTimeComponent,
    WorkCalendarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FullCalendarModule,
  ]
})
export class CompanyAdministratorModule { }
