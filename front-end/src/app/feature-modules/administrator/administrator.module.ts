import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdministratorComponent } from './create-administrator/create-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateAdministratorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateAdministratorComponent
  ]
})
export class AdministratorModule { }
