import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature-modules/user/user.service';
import { filter, switchMap } from 'rxjs';
import { CompanyAdministratorService } from 'src/app/feature-modules/company-administrator/company-administrator.service';
import { User2 } from '../model/user2.model';
import { User } from '../model/user.model';
import { CompanyAdministrator } from '../model/company-administrator.model';
import { Role } from '../model/role.model';
import { HttpResponse } from '@angular/common/http';
import { AdministratorService } from 'src/app/feature-modules/administrator/administrator.service';
import { Administrator } from '../model/administrator.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  form!: FormGroup;
  submitted = false;
  loginError = '';

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService, private companyAdministratorService: CompanyAdministratorService, private administratorService: AdministratorService){
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

 
  onSubmit() {
    this.submitted = true;
    this.authService.login(this.form.value).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Login success', response);
  
        const userEmail = this.form.get('email')?.value; // Get the user email from the form
  
        this.userService.getUserDetails(userEmail).subscribe(
          (user: User2) => {
            console.log('Received User:', user);
  
            // Check if the user is an administrator
            if (this.isUserCompanyAdministrator(user)) {
              const userId = this.getUserIdFromUserDetails(user); // Get the user ID from UserDetails
              
              if (userId) {
                this.redirectIfCompanyAdministrator(userId); // Redirect if the user is an administrator
              } else {
                console.error('User ID not found.');
                this.submitted = false;
                this.router.navigate(['/home']); // Redirect if user ID not found
              }
            }
            else if(this.isUserAdministrator(user))
            {
              const userId = this.getUserIdFromUserDetails(user); // Get the user ID from UserDetails
              
              if (userId) {
                this.redirectIfAdministrator(userId); // Redirect if the user is an administrator
              } else {
                console.error('User ID not found.');
                this.submitted = false;
                this.router.navigate(['/home']); // Redirect if user ID not found
              }
            }
            else {
              console.log('User is not a company administrator.');
              this.submitted = false;
              this.router.navigate(['/home']); // Redirect if the user is not an administrator
            }
          },
          (error) => {
            console.error('Error fetching user details:', error);
            this.submitted = false;
            this.router.navigate(['/home']); // Redirect if error fetching user details
          }
        );
      },
      (error) => {
        console.error('Login error:', error);
        this.submitted = false;
        this.router.navigate(['/home']); // Redirect if login error
      }
    );
  }
  
  // Function to check if the user is an administrator
  private isUserCompanyAdministrator(user: User2): boolean {
    // Implement logic to determine if the user is an administrator based on your application's criteria
    // For example:
    return user.role.name === 'ROLE_COMPANY_ADMIN'; // Assuming there's a role field indicating administrator status
  }

  private isUserAdministrator(user: User2): boolean {
    // Implement logic to determine if the user is an administrator based on your application's criteria
    // For example:
    return user.role.name === 'ROLE_ADMIN'; // Assuming there's a role field indicating administrator status
  }
  
  // Function to redirect if the user is an administrator
  private redirectIfCompanyAdministrator(userId: number) {
    this.companyAdministratorService.getCompanyAdministratorByUserId(userId).subscribe(
      (adminUser: CompanyAdministrator | null) => {
        if (adminUser !== null && adminUser.loggedInBefore !== undefined && adminUser.loggedInBefore) {
          this.router.navigate(['/home']); // Redirect to home if an administrator is already logged in
        } else {
          this.router.navigate(['/change-password-first-time']); // Redirect to change password for non-administrators
        }
      },
      (error: any) => {
        console.error('Error fetching company administrator:', error);
        // Handle the error if necessary, but no redirection for non-admin users is needed here
      }
    );
  }

  private redirectIfAdministrator(userId: number) {
    this.administratorService.getAdministratorByUserId(userId).subscribe(
      (adminUser: Administrator | null) => {
        if (adminUser !== null && adminUser.loggedInBefore !== undefined && adminUser.loggedInBefore) {
          this.router.navigate(['/home']); // Redirect to home if an administrator is already logged in
        } else {
          this.router.navigate(['/change-password']); // Redirect to change password for non-administrators
        }
      },
      (error: any) => {
        console.error('Error fetching administrator:', error);
        // Handle the error if necessary, but no redirection for non-admin users is needed here
      }
    );
  }
  
  
  // Function to extract user ID from UserDetails
  private getUserIdFromUserDetails(user: User2): number | undefined {
    // Implement logic to extract user ID from UserDetails (if available)
    // For example, assuming the user ID is stored in the user object, you can do:
    return user.id;
  }
}