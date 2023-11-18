import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CreateCompanyComponent } from 'src/app/feature-modules/company/create-company/create-company.component';

const routes: Routes = [
  {path: '', component: AppComponent },
  {path: 'create-company', component: CreateCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
