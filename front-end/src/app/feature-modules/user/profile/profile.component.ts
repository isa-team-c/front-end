import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { UserService } from '../user.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId: number = 1;
  regularUser!: Profile;
  isEditing: boolean = false;
  originalUser: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe((profileData: Profile) => {
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
