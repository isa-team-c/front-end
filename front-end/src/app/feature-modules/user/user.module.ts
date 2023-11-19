import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { EquipmentOverviewComponent } from './equipment-overview/equipment-overview.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    UserReviewComponent,
    EquipmentOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
