import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyAdministratorComponent } from './create-company-administrator/create-company-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateCompanyAdministratorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class CompanyAdministratorModule { }
