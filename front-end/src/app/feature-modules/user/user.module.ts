import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CompanyReviewComponent } from './company-review/company-review.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EquipmentOverviewComponent } from './equipment-overview/equipment-overview.component';
import { FormsModule } from '@angular/forms';
import { ReservedAppointmentsComponent } from './reserved-appointments/reserved-appointments.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CompanyReviewComponent,
    EquipmentOverviewComponent,
    ReservedAppointmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule
  ], 
  exports: [
    ProfileComponent,
    CompanyReviewComponent,
    EquipmentOverviewComponent
  ],
  
})
export class UserModule { }
