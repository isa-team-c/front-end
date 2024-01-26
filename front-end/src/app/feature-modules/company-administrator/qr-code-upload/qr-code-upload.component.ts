import { Component } from '@angular/core';
import { CompanyAdministratorService } from '../company-administrator.service';
import { Reservation, ReservationStatus } from '../../company/model/reservation.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Equipment } from '../../user/model/equipment.model';

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

  constructor(private companyAdministratorService: CompanyAdministratorService) {}

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
      },
      (error: any) => {
        console.error('Error uploading QR code:', error);
      }
    );
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
    }
  }

  

  isCurrentDateBeforeEndDate(): boolean {
    if (this.calculatedEndDate) {
      const currentDate = new Date();
      return currentDate > this.extractedAppoitmentDate! && currentDate < this.calculatedEndDate;
    }
    return false;
  }
  
  onConfirmClick(): void {
    if (this.reservation) {
      this.reservation.status = ReservationStatus.TAKEN;
      console.log("Rezervacija koja se salje: ", this.reservation);
  
      this.companyAdministratorService.updateReservationStatus(this.reservation)
        .subscribe(
          () => {
            console.log('Reservation status updated to TAKEN successfully.');
            const user: User = this.user!;
            if (user) {
              this.companyAdministratorService.sendReceiveConfirmation(user).subscribe(
                (response) => {
                  alert('Response has been sent via mail!');
                },
                (error) => {
                  // Handle error if the response fails to send
                  console.error('Error sending response:', error);
                }
              );
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
