import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature-modules/user/user.service';
import { filter, switchMap } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  form!: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService){
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
      data => {
        console.log(data);
        // Provera prvog logovanja nakon uspešne prijave
        this.authService.checkFirstLogin();
        const isFirstLogin = this.authService.getFirstLoginStatus();

        if (isFirstLogin) {
          this.router.navigate(['/change-password-first-time']); // Ako je prvi put logovan, preusmeri na formu za promenu lozinke
        } else {
          this.router.navigate(['/home']); // Ako nije prvi put logovan, preusmeri na home stranicu ili drugu
        }
      },
      error => {
        console.log(error);
        this.submitted = false;
      }
    );
  }



  
}