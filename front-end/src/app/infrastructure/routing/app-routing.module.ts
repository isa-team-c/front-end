import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AppComponent } from 'src/app/app.component';
const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
