import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyReviewComponent } from 'src/app/feature-modules/user/company-review/company-review.component';
import { ProfileComponent } from 'src/app/feature-modules/user/profile/profile.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AppComponent } from 'src/app/app.component';
import { VerificationComponent } from '../auth/verification/verification.component';
import { EquipmentOverviewComponent } from 'src/app/feature-modules/user/equipment-overview/equipment-overview.component';
import { CreateCompanyComponent } from 'src/app/feature-modules/company/create-company/create-company.component';
import { CreateCompanyAdministratorComponent } from 'src/app/feature-modules/company-administrator/create-company-administrator/create-company-administrator.component';
import { CompanyUpdateComponent } from 'src/app/feature-modules/company/company-update/company-update.component';
import { CompanyAdministratorUpdateComponent } from 'src/app/feature-modules/company-administrator/company-administrator-update/company-administrator-update.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'companies', component: CompanyReviewComponent},
  { path: 'home', component: AppComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'verification/:id' , component: VerificationComponent},
  { path: 'equipment-overview' , component: EquipmentOverviewComponent},
  { path: '', component: AppComponent },
  { path: 'create-company', component: CreateCompanyComponent},
  { path: 'create-company-administrator', component: CreateCompanyAdministratorComponent},
  { path: 'company-update', component: CompanyUpdateComponent},
  { path: 'company-administrator-update', component: CompanyAdministratorUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
