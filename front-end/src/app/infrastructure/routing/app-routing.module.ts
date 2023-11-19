import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyReviewComponent } from 'src/app/feature-modules/user/company-review/company-review.component';
import { ProfileComponent } from 'src/app/feature-modules/user/profile/profile.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'companies', component: CompanyReviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
