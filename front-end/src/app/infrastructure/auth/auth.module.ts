import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { VerificationComponent } from './verification/verification.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  exports: [
    RegistrationComponent,
    LoginComponent
  ]
})
export class AuthModule { }