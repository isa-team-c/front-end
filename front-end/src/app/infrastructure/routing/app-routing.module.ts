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
import { LoginComponent } from '../auth/login/login.component';
import { CreateAdministratorComponent } from 'src/app/feature-modules/administrator/create-administrator/create-administrator.component';
import { CompanyUpdateComponent } from 'src/app/feature-modules/company/company-update/company-update.component';
import { CompanyAdministratorUpdateComponent } from 'src/app/feature-modules/company-administrator/company-administrator-update/company-administrator-update.component';
import { ChangePasswordComponent } from 'src/app/feature-modules/administrator/change-password/change-password.component';
import { ComplaintsOverviewComponent } from 'src/app/feature-modules/complaint/complaints-overview/complaints-overview.component';
import { CompanyOverviewComponent } from 'src/app/feature-modules/company/company-overview/company-overview.component';
import { ReservedAppointmentsComponent } from 'src/app/feature-modules/user/reserved-appointments/reserved-appointments.component';
import { AppointmentCreateComponent } from 'src/app/feature-modules/company-administrator/appointment-create/appointment-create.component';
import { EquipmentOverviewForCompanyComponent } from 'src/app/feature-modules/company/equipment-overview-for-company/equipment-overview-for-company.component';
import { CreateEquipmentComponent } from 'src/app/feature-modules/company/create-equipment/create-equipment.component';
import { UpdateEquipmentComponent } from 'src/app/feature-modules/company/update-equipment/update-equipment.component';
import { ChangePasswordCompanyAdminComponent } from 'src/app/feature-modules/company-administrator/change-password-company-admin/change-password-company-admin.component';
import { ChangePasswordFirstTimeComponent } from 'src/app/feature-modules/company-administrator/change-password-first-time/change-password-first-time.component';
import { WorkCalendarComponent } from 'src/app/feature-modules/company-administrator/work-calendar/work-calendar.component';
import { HomeComponent } from 'src/app/layout/home/home.component';
import { TakenReservationsComponent } from 'src/app/feature-modules/user/taken-reservations/taken-reservations.component';
import { UpcomingReservationsComponent } from 'src/app/feature-modules/user/upcoming-reservations/upcoming-reservations.component';
import { UsersWithEquipmentReservationsComponent } from 'src/app/feature-modules/company/users-with-equipment-reservations/users-with-equipment-reservations.component';
import { EquipmentTakeoverComponent } from 'src/app/feature-modules/company-administrator/equipment-takeover/equipment-takeover.component';
import { AppointmentStatisticsComponent } from 'src/app/feature-modules/company-administrator/appointment-statistics/appointment-statistics.component';
import { ReservationStatisticsComponent } from 'src/app/feature-modules/company-administrator/reservation-statistics/reservation-statistics.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'companies', component: CompanyReviewComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'verification/:id' , component: VerificationComponent},
  { path: 'equipment-overview' , component: EquipmentOverviewComponent},
  { path: '', component: AppComponent },
  { path: 'create-company', component: CreateCompanyComponent},
  { path: 'create-company-administrator', component: CreateCompanyAdministratorComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create-administrator', component: CreateAdministratorComponent},
  { path: 'company-update', component: CompanyUpdateComponent},
  { path: 'company-administrator-update', component: CompanyAdministratorUpdateComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'complaints-overview', component: ComplaintsOverviewComponent},
  { path: 'company/:id', component: CompanyOverviewComponent},
  { path: 'reserved-appointments', component: ReservedAppointmentsComponent},
  { path: 'appointment-create', component: AppointmentCreateComponent},
  { path: 'equipment-overview-for-company/:id', component: EquipmentOverviewForCompanyComponent},
  { path: 'create-equipment/:companyId', component: CreateEquipmentComponent},
  { path: 'update-equipment/:id', component: UpdateEquipmentComponent},
  { path: 'change-password-company-admin', component: ChangePasswordCompanyAdminComponent},
  { path: 'change-password-first-time', component: ChangePasswordFirstTimeComponent},
  { path: 'work-calendar', component: WorkCalendarComponent},
  { path: 'pickup-history', component: TakenReservationsComponent},
  { path: 'upcoming-reservations', component: UpcomingReservationsComponent},
  { path: 'users-with-equipment-reservations', component: UsersWithEquipmentReservationsComponent},
  { path: 'equipment-takeover', component: EquipmentTakeoverComponent},
  { path: 'appointment-statistics', component: AppointmentStatisticsComponent},
  { path: 'reservation-statistics', component: ReservationStatisticsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
