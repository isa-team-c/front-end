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
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { QrCodeUploadComponent } from './qr-code-upload/qr-code-upload.component';
import { EquipmentTakeoverComponent } from './equipment-takeover/equipment-takeover.component';
import { AppointmentStatisticsComponent } from './appointment-statistics/appointment-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { ReservationStatisticsComponent } from './reservation-statistics/reservation-statistics.component';



@NgModule({
  declarations: [
    CreateCompanyAdministratorComponent,
    CompanyAdministratorUpdateComponent,
    AppointmentCreateComponent,
    ChangePasswordCompanyAdminComponent,
    ChangePasswordFirstTimeComponent,
    WorkCalendarComponent,
    QrCodeUploadComponent,
    EquipmentTakeoverComponent,
    AppointmentStatisticsComponent,
    ReservationStatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgChartsModule
  ],
  exports: [
    FullCalendarModule,
  ]
})
export class CompanyAdministratorModule { }
