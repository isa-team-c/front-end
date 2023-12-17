import { Component } from '@angular/core';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';
import { UserService } from '../../user/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CompanyAdministratorService } from '../company-administrator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-company-admin',
  templateUrl: './change-password-company-admin.component.html',
  styleUrls: ['./change-password-company-admin.component.css']
})
export class ChangePasswordCompanyAdminComponent {
  submitted = false;
  userId: number | undefined;
  companyAdministrator!: CompanyAdministrator;

  constructor(private userService: UserService, private authService: AuthService, private companyAdministratorService: CompanyAdministratorService) {}

  onSubmit() {
    const user: User2 = {
      city: this.companyAdministrator.user.city,
      companyInformation:  this.companyAdministrator.user.companyInformation,
      country: this.companyAdministrator.user.country,
      email: this.companyAdministrator.user.email,
      id: this.companyAdministrator.user.id,
      name: this.companyAdministrator.user.name,
      password: this.changePasswordForm.value.password || "",
      phoneNumber: this.companyAdministrator.user.phoneNumber,
      profession: this.companyAdministrator.user.profession,
      role: this.companyAdministrator.user.role,
      surname: this.companyAdministrator.user.surname,
    };

    const companyAdministrator: CompanyAdministrator = {
      id: this.companyAdministrator.id,
      user: user,
      loggedInBefore: true,
    };

    this.companyAdministratorService.updateCompanyAdministratorForPassword(companyAdministrator).subscribe({
      next: () => {
        alert('Password updated successfully!');
      },
    });
  }

  ngOnInit() {    
    this.authService.user$.subscribe(user => {
      if (user.id) {
        this.userId = user.id;
        this.getCompanyAdministrator(this.userId);
      }
    })
  }

  getCompanyAdministrator(userId: number) {
    this.companyAdministratorService.getCompanyAdministratorByUserId(userId).subscribe((companyAdministratorData: CompanyAdministrator) => {
      console.log('Company Administrator data:', companyAdministratorData);
      this.companyAdministrator = companyAdministratorData;
      console.log('Successfully retrieved company administrator:', this.companyAdministrator);
    });
  }

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });
}
