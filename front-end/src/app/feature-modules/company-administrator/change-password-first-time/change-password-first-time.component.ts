import { Component } from '@angular/core';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { UserService } from '../../user/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CompanyAdministratorService } from '../company-administrator.service';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-first-time',
  templateUrl: './change-password-first-time.component.html',
  styleUrls: ['./change-password-first-time.component.css']
})
export class ChangePasswordFirstTimeComponent {
  submitted = false;
  userId: number | undefined;
  companyAdministrator!: CompanyAdministrator;
 

  constructor(private userService: UserService, private authService: AuthService, private companyAdministratorService: CompanyAdministratorService, private router: Router) {}

  onSubmit() {
    const user: User2 = {
      city: this.companyAdministrator.user.city,
      companyInformation:  this.companyAdministrator.user.companyInformation,
      country: this.companyAdministrator.user.country,
      email: this.companyAdministrator.user.email,
      id: this.companyAdministrator.user.id,
      name: this.companyAdministrator.user.name,
      password: this.changePasswordForm.value.password || '',
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
        
        // Nakon uspešne promene lozinke, ažurirajte loggedInBefore na true
        this.companyAdministrator.loggedInBefore = true;
        this.router.navigate(['/home']);

        // Ažurirajte CompanyAdministrator na serveru sa izmenjenim loggedInBefore
        this.companyAdministratorService.updateCompanyAdministrator(this.companyAdministrator).subscribe({
          next: () => {
            console.log('loggedInBefore updated to true');
          },
          error: (err) => {
            console.error(err);
          }
        });
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
  
      // Ovde možete proveriti da li je this.companyAdministrator.user definisan
      if (this.companyAdministrator && this.companyAdministrator.user) {
        console.log('Successfully retrieved company administrator:', this.companyAdministrator);
      } else {
        console.error('Company administrator or user object is undefined or null.');
        // Dodajte odgovarajući tretman u slučaju da su objekti neinicijalizovani
      }
    });
  }

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });
}
