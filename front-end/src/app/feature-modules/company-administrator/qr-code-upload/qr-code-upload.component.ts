import { Component } from '@angular/core';
import { CompanyAdministratorService } from '../company-administrator.service';

@Component({
  selector: 'app-qr-code-upload',
  templateUrl: './qr-code-upload.component.html',
  styleUrls: ['./qr-code-upload.component.css']
})
export class QrCodeUploadComponent {
  qrCodeData: string | undefined;
  extractedUserId: number | undefined;
  extractedAppoitmentDate: Date | undefined;
  extractedAppoitmentDuration: number | undefined;
  extractedEndDate: Date | undefined;

  constructor(private companyAdministratorService: CompanyAdministratorService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    this.companyAdministratorService.uploadQRCodeImage(file).subscribe(
      (data: any) => {
        this.qrCodeData = data;
        this.extractUserId(data);
        this.extractAppoitmentDate(data);
        this.extractAppoitmentDuration(data);
        this.calculateEndDate();
      },
      (error: any) => {
        console.error('Error uploading QR code:', error);
      }
    );
  }

  private extractUserId(qrCodeData: string): void {
    const userIdMatch = qrCodeData.match(/User ID: (\d+)/);
    this.extractedUserId = userIdMatch ? +userIdMatch[1] : undefined;
    console.log('Extracted User ID:', this.extractedUserId);
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
      this.extractedEndDate = endDate;
      console.log('Calculated End Date:', this.extractedEndDate);
    }
  }

  isCurrentDateBeforeEndDate(): boolean {
    if (this.extractedEndDate) {
      const currentDate = new Date();
      return currentDate > this.extractedAppoitmentDate! && currentDate < this.extractedEndDate;
    }
    return false;
  }
}
