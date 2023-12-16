import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdministratorComponent } from './create-administrator/create-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    CreateAdministratorComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateAdministratorComponent,
    ChangePasswordComponent
  ]
})
export class AdministratorModule { }
