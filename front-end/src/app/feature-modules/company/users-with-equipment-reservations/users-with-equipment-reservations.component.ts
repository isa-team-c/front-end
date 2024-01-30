import { Component } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Role } from 'src/app/infrastructure/auth/model/role.model';

@Component({
  selector: 'app-users-with-equipment-reservations',
  templateUrl: './users-with-equipment-reservations.component.html',
  styleUrls: ['./users-with-equipment-reservations.component.css']
})
export class UsersWithEquipmentReservationsComponent {

  isAdmin!: boolean;
  isLogged!: boolean;
  userId: number | undefined; // Pretpostavljam da je userId string, promenite tip ako je drugačiji
  companyId!: number; // Pretpostavljam da je companyId string, promenite tip ako je drugačiji
  reservedUsers:  User[] = []; // Promenite tip ako su podaci drugačiji
  role: Role | undefined;

  constructor(private service: CompanyService,  private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user.id != 0) {
       this.userId = user.id;
       this.role = user.role;
       this.isAdmin = user.role.name === 'ROLE_COMPANY_ADMIN';
       this.isLogged = true;
      
      }
      if(this.isAdmin){
        this.getUsersWithTakenReservations();
       }
      });
  
  }

  getUsersWithTakenReservations() {
    if (this.isAdmin && this.isLogged && this.userId) {
      // Koristi funkciju za dobijanje kompanije za administratora
      this.service.getCompanyForAdministrator(this.userId).subscribe(
        (company) => {
          // Sada možete direktno koristiti company.id unutar ove funkcije
          this.service.getUsersWithTakenReservationsByCompanyId(company.id).subscribe(
            (users) => {
              this.reservedUsers = users;
            },
            (error) => {
              console.error('Error fetching users with taken reservations:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching company for administrator:', error);
        }
      );
    }
  }

}
