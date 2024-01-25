import { Component } from '@angular/core';
import { CompanyAdministratorService } from '../company-administrator.service';

@Component({
  selector: 'app-qr-code-upload',
  templateUrl: './qr-code-upload.component.html',
  styleUrls: ['./qr-code-upload.component.css']
})
export class QrCodeUploadComponent {
  qrCodeData: string | undefined;
  userId: number | undefined;  // Change the type to number
  extractedDate: Date | undefined;  // Change the type to Date

  constructor(private companyAdministratorService: CompanyAdministratorService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    this.companyAdministratorService.uploadQRCodeImage(file).subscribe(
      (data: any) => {
        this.qrCodeData = data; // Save the entire QR code data
        this.extractUserId(data); // Extract and set the User ID
        this.extractDate(data); // Extract and set the date
      },
      (error: any) => {
        console.error('Error uploading QR code:', error);
      }
    );
  }

  private extractUserId(qrCodeData: string): void {
    // Extract User ID using string manipulation
    const userIdMatch = qrCodeData.match(/User ID: (\d+)/);
    this.userId = userIdMatch ? +userIdMatch[1] : undefined;  // Convert to number
    console.log('User ID:', this.userId);
  }

  private extractDate(qrCodeData: string): void {
    // Extract date using string manipulation based on the format
    // Modify the regular expression or extraction logic as needed
    const dateMatch = qrCodeData.match(/Date: (\d{4}-\d{2}-\d{2})/);
    this.extractedDate = dateMatch ? new Date(dateMatch[1]) : undefined;  // Convert to Date
    console.log('Extracted Date:', this.extractedDate);
  }
}
