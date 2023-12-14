import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';

@NgModule({
  declarations: [
    CreateCompanyComponent,
    CompanyOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class CompanyModule { }
