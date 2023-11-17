import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserReviewComponent } from './user-review/user-review.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UserReviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
