import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { EquipmentOverviewForCompanyComponent } from './equipment-overview-for-company/equipment-overview-for-company.component';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import { UpdateEquipmentComponent } from './update-equipment/update-equipment.component';



@NgModule({
  declarations: [
    CreateCompanyComponent,
    CompanyUpdateComponent,
    EquipmentOverviewForCompanyComponent,
    CreateEquipmentComponent,
    UpdateEquipmentComponent,
    
 
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
