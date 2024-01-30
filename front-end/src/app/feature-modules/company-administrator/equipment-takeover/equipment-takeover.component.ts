import { Component } from '@angular/core';
import { Reservation, ReservationStatus } from '../../company/model/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../../user/user.service';
import { CompanyService } from '../../company/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/infrastructure/auth/model/company.model';


@Component({
  selector: 'app-equipment-takeover',
  templateUrl: './equipment-takeover.component.html',
  styleUrls: ['./equipment-takeover.component.css']
})
export class EquipmentTakeoverComponent {

  reservations: Reservation[] = [];
  companyId: number | undefined;
  administratorId!: number;
  company: Company | undefined;

  constructor(private authService: AuthService, private service: UserService, private companyService: CompanyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.administratorId = user.id;
      
        
    
       this.loadReservations();
      }
    })
  }

  loadReservations() {
    this.companyService.getCompanyForAdministrator(this.administratorId).subscribe(
      (company) => {
        this.company = company;
        this.service.getAllReservationsForCompany(company.id).subscribe(
          (data) => {
            // Sort reservations before assigning
            this.reservations = data;
          },
          (error) => {
            console.error('Error loading all reservations:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading company for administrator:', error);
      }
    );
  }


  async allowEquipmentTakeover(reservation: Reservation) {
    console.log('allowReservation function called for reservation:', reservation);
  
    if (reservation.status === ReservationStatus.PENDING) {
      // Pozivamo servis za ažuriranje statusa
      this.service.updateReservationStatus(reservation.id!, ReservationStatus.TAKEN).subscribe(
        () => {
          // Ako je ažuriranje uspešno, ažuriramo lokalni objekat
          reservation.status = ReservationStatus.TAKEN;
  
          // Uklanjamo ažuriranu rezervaciju iz niza
          this.reservations = this.reservations.filter(r => r.id !== reservation.id);
  
          // Pozivamo servis za slanje e-maila
          this.service.sendEquipmentTakeoverConfirmation(reservation.user!).subscribe(
            () => {
              // Slanje e-maila uspešno
              console.log('Equipment takeover confirmation email sent successfully!');
              
              
              // Pozivamo servis za smanjenje količine opreme
              this.service.reduceEquipmentQuantity(this.company!.id, reservation).subscribe(
                () => {
                  // Smanjenje količine opreme uspešno
                  console.log('Equipment quantity reduced successfully!');
  
                  // Prikazujemo snackbar za uspeh
                  this.snackBar.open('Reservation successfully allowed.', 'Close', {
                    duration: 3000,
                    panelClass: ['success-snackbar']
                  });
                },
                (error) => {
                  // Greška prilikom smanjenja količine opreme
                  console.error('Error reducing equipment quantity:', error);
                  this.snackBar.open('Error reducing equipment quantity.', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                  });
                }
              );
            },
            (error) => {
              // Greška prilikom slanja e-maila
              console.error('Error sending equipment takeover confirmation email:', error);
              this.snackBar.open('Error sending equipment takeover confirmation email.', 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          );
        },
        (error) => {
          // Ako dođe do greške, prikazujemo snackbar sa porukom o grešci
          console.error('Error updating reservation status:', error);
          this.snackBar.open('It seems you are already on an appointment that overlaps with the selected one.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      // Ako status nije PENDING, prikazujemo snackbar sa odgovarajućom porukom
      console.log('Reservation status is not PENDING:', reservation.status);
      this.snackBar.open('Allow action is only applicable for PENDING reservations.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
    }
  }
  


  formatDate(date: Date | number[] | string): Date {
    let dateObj: Date;

    if (date instanceof Date) {
      dateObj = date;
    } else if (Array.isArray(date)) {
      dateObj = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
    } else {
      dateObj = new Date(date);
    }

    // Check if dateObj is a valid Date object
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date:', date);
      return new Date(); // Return some default value, e.g., the current date
    }

    return dateObj;
  }

}
