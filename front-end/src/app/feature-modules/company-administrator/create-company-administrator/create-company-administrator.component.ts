import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyAdministratorService } from '../company-administrator.service';
import { Observer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { User2 } from 'src/app/infrastructure/auth/model/user2.model';
import { Role } from 'src/app/infrastructure/auth/model/role.model';

@Component({
  selector: 'app-create-company-administrator',
  templateUrl: './create-company-administrator.component.html',
  styleUrls: ['./create-company-administrator.component.css']
})
export class CreateCompanyAdministratorComponent implements OnInit {
  submitted = false;

  ngOnInit() {
    
  }

  constructor(private http: HttpClient, private service: CompanyAdministratorService, private router: Router) { }

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
    companyInformation: new FormControl('', [Validators.required]),
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
        companyInformation: this.creationForm.value.companyInformation || "",
        country: this.creationForm.value.country || "",
        email: this.creationForm.value.email || "",
        id: 0,
        name: this.creationForm.value.name || "",
        password: this.creationForm.value.password || "",
        phoneNumber: this.creationForm.value.phoneNumber || "",
        profession: this.creationForm.value.profession || "",
        role: { id: 2, name: 'ROLE_COMPANY_ADMIN' },
        surname: this.creationForm.value.surname || ""
      };

      const companyAdministrator: CompanyAdministrator = {
        id: 0,
        user: user
      };

    
      this.service.create(companyAdministrator).subscribe({
        next: () => {
          alert('Company administrator created successfully!');
        },
      });
    }
  }





}
