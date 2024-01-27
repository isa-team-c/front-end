import { Component } from '@angular/core';
import { CompanyAdministratorService } from '../company-administrator.service';
import { Reservation, ReservationStatus } from '../../company/model/reservation.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Equipment } from '../../user/model/equipment.model';
import { Profile } from '../../user/model/profile.model';

@Component({
  selector: 'app-qr-code-upload',
  templateUrl: './qr-code-upload.component.html',
  styleUrls: ['./qr-code-upload.component.css']
})
export class QrCodeUploadComponent {
  qrCodeData: string | undefined;

  extractedReservationId: number | undefined;
  reservation: Reservation | undefined;

  extractedEquipmentId: number | undefined;
  equipment: Equipment | undefined;

  extractedAppoitmentDate: Date | undefined;
  extractedAppoitmentDuration: number | undefined;
  calculatedEndDate: Date | undefined;

  extractedUserId: number | undefined;
  user: User | undefined;

  regularUser: Profile | undefined;

  constructor(private companyAdministratorService: CompanyAdministratorService) {}

  isShowButton(): boolean {
    return !!this.calculatedEndDate && this.isCurrentDateBeforeEndDate();
  }
  

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    this.companyAdministratorService.uploadQRCodeImage(file).subscribe(
      (data: any) => {
        this.qrCodeData = data;
        this.extractReservationId(data);
        this.extractEquipmentId(data);
        this.extractAppoitmentDate(data);
        this.extractAppoitmentDuration(data);
        this.calculateEndDate();
        this.extractUserId(data);
  
        // Move the reservation extraction here
        if (this.extractedReservationId) {
          this.companyAdministratorService.getReservationById(this.extractedReservationId).subscribe(
            (reservationData: any) => {
              console.log('Reservation Data:', reservationData);
              this.reservation = reservationData;
  
              if (!this.isShowButton()) {
                this.handleRejectedStatus();
              }
            },
            (error: any) => {
              console.error('Error getting reservation by ID:', error);
            }
          );
        }
  
        if (!this.isShowButton()) {
          alert('The deadline for taking over the equipment has passed. Reservation rejected and user penalized.');
        }
      },
      (error: any) => {
        console.error('Error uploading QR code:', error);
      }
    );
  }
  
  private handleRejectedStatus(): void {
    if (this.reservation) {
      this.reservation.status = ReservationStatus.REJECTED;
      console.log("Rezervacija koja se salje: ", this.reservation);
  
      this.companyAdministratorService.updateReservationStatus(this.reservation)
        .subscribe(
          () => {
            console.log('Reservation status updated to REJECTED successfully.');
          },
          (error: any) => {
            console.error('Error updating reservation status:', error);
          }
        );
    } else {
      console.warn('No reservation data available to update status.');
    }
  }
  



  private extractReservationId(qrCodeData: string): void {
    const reservationIdMatch = qrCodeData.match(/Reservation id: (\d+)/);
    this.extractedReservationId = reservationIdMatch ? +reservationIdMatch[1] : undefined;
    console.log('Extracted Reservation ID:', this.extractedReservationId);

    if (this.extractedReservationId) {
      this.companyAdministratorService.getReservationById(this.extractedReservationId).subscribe(
        (reservationData: any) => {
          console.log('Reservation Data:', reservationData);
          this.reservation = reservationData;
        },
        (error: any) => {
          console.error('Error getting reservation by ID:', error);
        }
      );
    }
  }



  private extractAppoitmentDate(qrCodeData: string): void {
    const dateMatch = qrCodeData.match(/Date: (\d{4}-\d{2}-\d{2})/);
    this.extractedAppoitmentDate = dateMatch ? new Date(dateMatch[1]) : undefined;
    console.log('Extracted Appointment Date:', this.extractedAppoitmentDate);
  }

  private extractAppoitmentDuration(qrCodeData: string): void {
    const durationMatch = qrCodeData.match(/Appointment Duration: (\d+)/);
    this.extractedAppoitmentDuration = durationMatch ? +durationMatch[1] : undefined;
    console.log('Extracted Appointment Duration:', this.extractedAppoitmentDuration);
  }

  private calculateEndDate(): void {
    if (this.extractedAppoitmentDate && this.extractedAppoitmentDuration) {
      const endDate = new Date(this.extractedAppoitmentDate);
      endDate.setDate(endDate.getDate() + this.extractedAppoitmentDuration);
      this.calculatedEndDate = endDate;
      console.log('Calculated End Date:', this.calculatedEndDate);
    }
  }

  isCurrentDateBeforeEndDate(): boolean {
    if (this.calculatedEndDate) {
      const currentDate = new Date();
      return currentDate < this.calculatedEndDate;
    }
    return false;
  }



  private extractEquipmentId(qrCodeData: string): void {
    const equipmentIdMatch = qrCodeData.match(/Equipment ID: (\d+)/);
    this.extractedEquipmentId = equipmentIdMatch ? +equipmentIdMatch[1] : undefined;
    console.log('Extracted Equipment ID:', this.extractedEquipmentId);

    if (this.extractedEquipmentId) {
      this.companyAdministratorService.getEquipmentById(this.extractedEquipmentId).subscribe(
        (equipmentData: any) => {
          console.log('Equipment Data:', equipmentData);
          this.equipment = equipmentData;
        },
        (error: any) => {
          console.error('Error getting equipment by ID:', error);
        }
      );
    }
  }



  private extractUserId(qrCodeData: string): void {
    const userIdMatch = qrCodeData.match(/User ID: (\d+)/);
    this.extractedUserId = userIdMatch ? +userIdMatch[1] : undefined;
    console.log('Extracted User ID:', this.extractedUserId);

    if (this.extractedUserId) {
      this.companyAdministratorService.getUserById(this.extractedUserId).subscribe(
        (userData: any) => {
          console.log('User Data:', userData);
          this.user = userData;
        },
        (error: any) => {
          console.error('Error getting user by ID:', error);
        }
      );

      this.companyAdministratorService.getRegularUserByUserId(/*this.extractedUserId*/5).subscribe(
        (userData: any) => {
          console.log('Regular User Data:', userData);
          this.user = userData;
        },
        (error: any) => {
          console.error('Error getting regular user by user ID:', error);
        }
      );
    }
  }

  

  onConfirmClick(): void {
    if (this.reservation) {
      // Set reservation status to TAKEN
      this.reservation.status = ReservationStatus.TAKEN;
      console.log("Rezervacija koja se salje: ", this.reservation);
  
      // Update reservation status
      this.companyAdministratorService.updateReservationStatus(this.reservation).subscribe(
        () => {
          console.log('Reservation status updated to TAKEN successfully.');
  
          // Decrease equipment quantity by 1
          if (this.equipment && this.equipment.quantity && this.equipment.quantity > 0) {
            this.equipment.quantity -= 1;
  
            // Update equipment quantity
            this.companyAdministratorService.updateEquipment(this.equipment).subscribe(
              () => {
                console.log('Equipment quantity updated successfully.');
  
                // Send receive confirmation via mail
                const user: User = this.user!;
                if (user) {
                  this.companyAdministratorService.sendReceiveConfirmation(user).subscribe(
                    (response) => {
                      alert('Equipment taken, response sent via mail!');
                    },
                    (error) => {
                      // Handle error if the response fails to send
                      console.error('Error sending response:', error);
                    }
                  );
                }
              },
              (error: any) => {
                console.error('Error updating equipment quantity:', error);
              }
            );
          } else {
            console.warn('No equipment data available to update quantity.');
          }
        },
        (error: any) => {
          console.error('Error updating reservation status:', error);
        }
      );
    } else {
      console.warn('No reservation data available to update status.');
    }
  }
  
  
}
