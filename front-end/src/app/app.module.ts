import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { UserModule } from './feature-modules/user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AuthService } from './infrastructure/auth/auth.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { CompaniesOverviewComponent } from './feature-modules/company/companies-overview/companies-overview.component';
import { CompanyModule } from './feature-modules/company/company.module';
import { CompanyAdministratorModule } from './feature-modules/company-administrator/company-administrator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from './feature-modules/user/user.service';
import { TokenInterceptor } from './infrastructure/auth/interceptor/TokenInterceptor';
import { AdministratorModule } from './feature-modules/administrator/administrator.module';
import { CompanyUpdateComponent } from './feature-modules/company/company-update/company-update.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AuthModule,
    CompanyModule,
    CompanyAdministratorModule,
    MatButtonModule,
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    CompanyAdministratorModule,
    AdministratorModule,
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,     
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
