import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyAdministratorComponent } from './create-company-administrator/create-company-administrator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyAdministratorUpdateComponent } from './company-administrator-update/company-administrator-update.component';



@NgModule({
  declarations: [
    CreateCompanyAdministratorComponent,
    CompanyAdministratorUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class CompanyAdministratorModule { }
