import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { UserService } from '../user.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  regularUser!: Profile;
  isEditing: boolean = false;
  originalUser: any;
  userId: number | undefined;

  constructor(private userService: UserService, private authService: AuthService) {}


  ngOnInit() {    
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.userId = user.id;
        
        this.getUserProfile(this.userId);
      }
    })
  }

  getUserProfile(userId: number) {
    this.userService.getUserProfile(userId).subscribe((profileData: Profile) => {
      console.log('Profile data:', profileData);
      this.regularUser = profileData;
      console.log('Uspesno dobijen profil:', this.regularUser);
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  editProfile() {
    this.isEditing = true;
    this.originalUser = JSON.parse(JSON.stringify(this.regularUser));
    
  }



saveChanges() {
  this.userService.updateUserProfile(this.regularUser).subscribe(
    (updatedProfile: Profile) => {
      console.log('Uspešno ažurirani podaci:', updatedProfile);
      this.isEditing = false; 
    },
    (error: any) => {
      console.error('Greška prilikom ažuriranja podataka:', error);
    }
  );
}

cancelEdit() {
    this.regularUser = { ...this.originalUser };
    this.originalUser = JSON.parse(JSON.stringify(this.regularUser));
    this.isEditing = false;
  
}

}
