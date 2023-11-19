import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CreateCompanyComponent } from 'src/app/feature-modules/company/create-company/create-company.component';
import { CreateCompanyAdministratorComponent } from 'src/app/feature-modules/company-administrator/create-company-administrator/create-company-administrator.component';

const routes: Routes = [
  {path: '', component: AppComponent },
  {path: 'create-company', component: CreateCompanyComponent},
  {path: 'create-company-administrator', component: CreateCompanyAdministratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
