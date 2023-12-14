import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './infrastructure/auth/auth.service';
import { UserService } from './feature-modules/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}
  title = 'MedBooking';

  showChangePassword: boolean = true;

  ngOnInit(): void {
    this.checkIfUserExists();
  }

  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }

  register(){
    this.router.navigate(['/register']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn(): boolean {
    return this.authService.tokenIsPresent();
  }

  userName() {
    const user = this.userService.currentUser;
    return user.name + ' ' + user.surname;
  }
}
