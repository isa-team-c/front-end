import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/feature-modules/user/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: User | undefined;
  isRegular!: boolean;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

 

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user.id!=0) {
        if(user.role.name === 'ROLE_REGULAR_USER'){
          this.isRegular = true;
        
        }}});
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
