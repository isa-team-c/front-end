import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;

  ngOnInit() {
    
  }

  constructor(private http: HttpClient,private authService: AuthService,
    private router: Router) { }

  registrationForm = new FormGroup({
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
    });


  onSubmit(): void {
    this.submitted = true;
    console.log('Form value:', this.registrationForm.value);
    console.log('Form validity:', this.registrationForm.valid);
    const user: User = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password || "",
      city: this.registrationForm.value.city || "",
      country: this.registrationForm.value.country || "",
      phoneNumber: this.registrationForm.value.phoneNumber || "",
      profession: this.registrationForm.value.profession || "",
      companyInformation: this.registrationForm.value.companyInformation || "",
      confirmationPassword: this.registrationForm.value.confirmationPassword || ""
    };

    if (this.registrationForm.valid) {
      this.authService.register(user).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
      });
    }
  }

}

