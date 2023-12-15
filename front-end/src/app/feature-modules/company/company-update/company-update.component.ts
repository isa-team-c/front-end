import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyService } from '../company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../../user/user.service';
import { Profile } from '../../user/model/profile.model';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit{
  selectedCompany$: Observable<Company> | undefined; 
  isEditing: boolean = false;
  administratorId!: number;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    averageRating: new FormControl(0, [Validators.required]),
  });

  originalCompany: Company | undefined;
  constructor(private companyService: CompanyService, private authService: AuthService,private userService: UserService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.administratorId = user.id;
        
    
        this.loadCompanyForAdministrator();
      }
    })
   

    
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  editCompany() {
    if (this.originalCompany) {
      this.isEditing = true;
      this.originalCompany = { ...this.originalCompany }; // Ako želite kopiju objekta, možete koristiti spread operator
    } else {
      console.error('Selected company is undefined.');
    }
  }


  loadCompanyForAdministrator(): void {
    this.selectedCompany$ = this.companyService.getCompanyForAdministrator(this.administratorId);
    this.selectedCompany$.subscribe(
      company => {
        this.originalCompany = company; // Postavljanje stvarne kompanije na originalCompany
        console.log('Dobijeni podaci o kompaniji:', this.originalCompany);
        this.updateForm.setValue({
          name: this.originalCompany?.name!, 
          address: this.originalCompany?.address!, 
          description: this.originalCompany?.description!, 
          averageRating: this.originalCompany?.averageRating!, 
        });
      },
      error => {
        console.error('Error loading company for administrator:', error);
      }
    );
  }

  updateCompany(): void {
    this.originalCompany!.name = this.updateForm.value.name!;
    this.originalCompany!.address = this.updateForm.value.address!;
    this.originalCompany!.description = this.updateForm.value.description!;
    this.originalCompany!.averageRating = this.updateForm.value.averageRating!;
    if (this.originalCompany) {
       this.companyService.updateCompany(this.originalCompany).subscribe(
         (updatedCompany: Company) => {
           console.log('Received updated company data:', updatedCompany);
           console.log('Uspešno ažurirani podaci:', updatedCompany);
           this.originalCompany = updatedCompany; // Update the originalCompany with the updatedCompany
           this.isEditing = false;
         },
         (error: any) => {
           console.error('Greška prilikom ažuriranja podataka:', error);
         }
       );
    } else {
       console.error('Original company data is undefined.');
    }
   }

  cancelEdit() {
    if (this.originalCompany) {
      this.originalCompany = { ...this.originalCompany };
      this.isEditing = false;
    } else {
      console.error('Original company data is undefined.');
    }
  }
}
