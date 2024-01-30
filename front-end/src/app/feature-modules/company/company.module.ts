import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { EquipmentOverviewForCompanyComponent } from './equipment-overview-for-company/equipment-overview-for-company.component';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import { UpdateEquipmentComponent } from './update-equipment/update-equipment.component';
import { UsersWithEquipmentReservationsComponent } from './users-with-equipment-reservations/users-with-equipment-reservations.component';



@NgModule({
  declarations: [
    CreateCompanyComponent,
    CompanyUpdateComponent,
    CompanyOverviewComponent,
    EquipmentOverviewForCompanyComponent,
    CreateEquipmentComponent,
    UpdateEquipmentComponent,
    UsersWithEquipmentReservationsComponent,
    
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatButtonModule,
    FormsModule
  ], exports: [
    CompanyUpdateComponent    
  ]
})
export class CompanyModule { }
