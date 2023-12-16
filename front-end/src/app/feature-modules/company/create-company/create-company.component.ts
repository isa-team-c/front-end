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
  });

  onSubmit(): void {
    this.submitted = true;
    console.log('Form value:', this.creationForm.value);
    console.log('Form validity:', this.creationForm.valid);
    const company: Company = {
      id:0,
      name: this.creationForm.value.name || "",
      address: this.creationForm.value.address || "",
      description: this.creationForm.value.description || "",
      averageRating: 0
    };

    if (this.creationForm.valid) {
      this.service.create(company).subscribe({
        next: () => {
          alert('Company created successfully!');
        },
      });
    }
  }
}
