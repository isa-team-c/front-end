import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsOverviewComponent } from './complaints-overview/complaints-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComplaintsOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComplaintModule { }
