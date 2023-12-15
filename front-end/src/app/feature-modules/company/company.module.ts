import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';

@NgModule({
  declarations: [
    CreateCompanyComponent,
    CompanyUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], exports: [
    CompanyUpdateComponent // Add this line to export the component
  ]
})
export class CompanyModule { }
