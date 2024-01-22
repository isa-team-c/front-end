import { Component } from '@angular/core';
import { Reservation } from '../../company/model/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taken-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taken-reservations.component.html',
  styleUrl: './taken-reservations.component.css'
})
export class TakenReservationsComponent {
  userId: number | undefined;
  reservations: Reservation[] = [];
  sortByColumn: 'date' | 'duration' | 'price' = 'date';
  sortByOrder: 'asc' | 'desc' = 'asc';

  constructor(private route: ActivatedRoute, private authService: AuthService, private service: UserService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user.id) {
        this.userId = user.id;
      }
    });

    this.loadReservations();
  }

  loadReservations() {
    this.service.getTakenReservationsByUserId(this.userId!).subscribe(
      (data) => {
        // Sort reservations before assigning
        this.reservations = this.sortReservations(data);
      },
      (error) => {
        console.error('Error loading taken reservations:', error);
      }
    );
  }

  sortReservations(reservations: Reservation[]): Reservation[] {
    try {
      const compareFunctions = {
        date: (a: Reservation, b: Reservation) => {
          const dateA = new Date(a.appointment!.startDate).getTime();
          const dateB = new Date(b.appointment!.startDate).getTime();
          return (this.sortByOrder === 'asc') ? dateA - dateB : dateB - dateA;
        },
        duration: (a: Reservation, b: Reservation) => {
          return (this.sortByOrder === 'asc') ? a.appointment!.duration - b.appointment!.duration : b.appointment!.duration - a.appointment!.duration;
        },
        price: (a: Reservation, b: Reservation) => {
          return (this.sortByOrder === 'asc') ? a.price! - b.price! : b.price! - a.price!;
        }
      };
  
      return reservations.sort(compareFunctions[this.sortByColumn]);
    } catch (error) {
      console.error('Error sorting reservations:', error);
      return reservations;
    }
  }
  
  // Method to handle column sorting
  sortReservationsByColumn(column: 'date' | 'duration' | 'price') {
    if (this.sortByColumn === column) {
      // If the currently sorted column is the same, change the sorting order
      this.sortByOrder = (this.sortByOrder === 'asc') ? 'desc' : 'asc';
  
    } else {
      // If the user clicked on a different column, set the new sorted column and set ascending order
      this.sortByColumn = column;
      this.sortByOrder = 'asc';
    }

    // Reload reservations with the updated sorting
    this.loadReservations();
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