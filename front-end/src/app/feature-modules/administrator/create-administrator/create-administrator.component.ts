import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../administrator.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';
import { Administrator } from 'src/app/infrastructure/auth/model/administrator.model';
import { Role } from 'src/app/infrastructure/auth/model/role.model';

@Component({
  selector: 'app-create-administrator',
  templateUrl: './create-administrator.component.html',
  styleUrls: ['./create-administrator.component.css']
})
export class CreateAdministratorComponent implements OnInit {
  submitted = false;

  ngOnInit() {
    
  }

  constructor(private http: HttpClient, private service: AdministratorService, private router: Router) { }

  creationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmationPassword: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    profession: new FormControl('', [Validators.required]),
    passwordMismatch: new FormControl(false),
  });












  onSubmit(): void {
    this.submitted = true;

    if (this.creationForm.valid) {
      const password = this.creationForm.value.password;
      const confirmationPassword = this.creationForm.value.confirmationPassword;

      if (password !== confirmationPassword) {
        this.creationForm.controls['passwordMismatch'].setValue(true);
        return;
      }

      this.creationForm.controls['passwordMismatch'].setValue(false);

      console.log('Form value:', this.creationForm.value);
      console.log('Form validity:', this.creationForm.valid);

      const user: User2 = {
        city: this.creationForm.value.city || "",
        companyInformation: "/",
        country: this.creationForm.value.country || "",
        email: this.creationForm.value.email || "",
        id: 0,
        name: this.creationForm.value.name || "",
        password: this.creationForm.value.password || "",
        phoneNumber: this.creationForm.value.phoneNumber || "",
        profession: this.creationForm.value.profession || "",
        role: { id: 3, name: 'ROLE_ADMIN' },
        surname: this.creationForm.value.surname || ""
      };

      const administrator: Administrator = {
        id: 0,
        user: user
      };

    
      this.service.create(administrator).subscribe({
        next: () => {
          alert('Administrator created successfully!');
        },
      });
    }
  }
}
