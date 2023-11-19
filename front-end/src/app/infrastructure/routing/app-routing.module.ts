import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AppComponent } from 'src/app/app.component';
import { VerificationComponent } from '../auth/verification/verification.component';

const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'verification/:id' , component: VerificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
