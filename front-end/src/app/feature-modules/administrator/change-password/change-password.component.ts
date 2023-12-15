import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Administrator } from 'src/app/infrastructure/auth/model/administrator.model';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';
import { AdministratorService } from '../administrator.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  submitted = false;
  userId: number | undefined;
  administrator!: Administrator;

  constructor(private userService: UserService, private authService: AuthService, private administratorService: AdministratorService) {}

  onSubmit() {
    const user: User2 = {
      city: this.administrator.user.city,
      companyInformation: "/",
      country: this.administrator.user.country,
      email: this.administrator.user.email,
      id: this.administrator.user.id,
      name: this.administrator.user.name,
      password: this.changePasswordForm.value.password || "",
      phoneNumber: this.administrator.user.phoneNumber,
      profession: this.administrator.user.profession,
      role: this.administrator.user.role,
      surname: this.administrator.user.surname,
    };

    const administrator: Administrator = {
      id: this.administrator.id,
      user: user,
      loggedInBefore: true,
    };

    this.administratorService.update(administrator).subscribe({
      next: () => {
        alert('Password updated successfully!');
      },
    });
  }

  ngOnInit() {    
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.userId = user.id;
        
        this.getAdministrator(this.userId);
      }
    })
  }

  getAdministrator(userId: number) {
    this.userService.getAdministrator(userId).subscribe((administratorData: Administrator) => {
      console.log('Administrator data:', administratorData);
      this.administrator = administratorData;
      console.log('Uspesno dobijen administrator:', this.administrator);
    });
  }

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });
}
