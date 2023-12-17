import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { Observer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  submitted = false;

  ngOnInit() {

    
    
  }

  constructor(private http: HttpClient, private service: CompanyService, private router: Router) { }

  creationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    workStartTime: new FormControl('', [Validators.required]),
    workEndTime: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    this.submitted = true;
    console.log('Form value:', this.creationForm.value);
    console.log('Form validity:', this.creationForm.valid);
    const startTime = this.creationForm.value.workStartTime!.split(':').map(Number);
    const endTime = this.creationForm.value.workEndTime!.split(':').map(Number);
    const company: Company = {
      id:0,
      name: this.creationForm.value.name || "",
      address: this.creationForm.value.address || "",
      description: this.creationForm.value.description || "",
      averageRating: 0,
      workStartTime: this.formatTime(startTime, 0),
    workEndTime: this.formatTime(endTime, 0),
    };
    

    if (this.creationForm.valid) {
      this.service.create(company).subscribe({
        next: () => {
          alert('Company created successfully!');
        },
      });
    }
  }

  formatTime(time: any, seconds: number): string {
    if (!Array.isArray(time) || time.length !== 2) {
      console.error('Received time is not in the expected format:', time);
      return ''; // ili obradite grešku na odgovarajući način
    }
  
    const [hours, minutes] = time;
    const formattedHours = this.padTimeUnit(hours);
    const formattedMinutes = this.padTimeUnit(minutes);
    const formattedSeconds = this.padTimeUnit(seconds);
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  padTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : `${unit}`;
  }
  
}