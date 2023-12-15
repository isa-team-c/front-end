import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompanyAdministrator } from 'src/app/infrastructure/auth/model/company-administrator.model';
import { CompanyAdministratorService } from '../company-administrator.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-company-administrator-update',
  templateUrl: './company-administrator-update.component.html',
  styleUrls: ['./company-administrator-update.component.css']
})
export class CompanyAdministratorUpdateComponent implements OnInit {
  selectedCompanyAdministrator$: Observable<CompanyAdministrator> | undefined;
  isEditing: boolean = false;
  administratorId!: number;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  originalAdministrator: CompanyAdministrator | undefined;
  
  constructor(private administratorService: CompanyAdministratorService, private authService: AuthService,private userService: UserService) { }

  ngOnInit(): void {
    

    this.authService.user$.subscribe(user => {
      if (user.id) {
       this.administratorId = user.id;
        
    
       this.loadAdministratorForUpdate();
      }
    })
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  editCompanyAdministrator() {
    if (this.originalAdministrator) {
      this.isEditing = true;
      this.originalAdministrator = { ...this.originalAdministrator };
    } else {
      console.error('Selected company administrator is undefined.');
    }
  }

  loadAdministratorForUpdate(): void {
    this.selectedCompanyAdministrator$ = this.administratorService.getCompanyAdministrator(this.administratorId);
    this.selectedCompanyAdministrator$.subscribe(
      administrator => {
        this.originalAdministrator = administrator;
        console.log('Retrieved administrator data:', this.originalAdministrator);
        this.updateForm.setValue({
          name: this.originalAdministrator?.user.name!,
          email: this.originalAdministrator?.user.email!,
          phoneNumber: this.originalAdministrator?.user.phoneNumber!,
          city: this.originalAdministrator?.user.city!,
        });
      },
      error => {
        console.error('Error loading company administrator:', error);
      }
    );
  }

  updateCompanyAdministrator(): void {
    if (this.originalAdministrator) {
      this.originalAdministrator.user.name = this.updateForm.value.name!;
      this.originalAdministrator.user.email = this.updateForm.value.email!;
      this.originalAdministrator.user.phoneNumber = this.updateForm.value.phoneNumber!;
      this.originalAdministrator.user.city = this.updateForm.value.city!;
      
      this.administratorService.updateCompanyAdministrator(this.originalAdministrator).subscribe(
        (updatedAdministrator: CompanyAdministrator) => {
          console.log('Received updated administrator data:', updatedAdministrator);
          this.originalAdministrator = updatedAdministrator;
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating company administrator:', error);
        }
      );
    } else {
      console.error('Original company administrator data is undefined.');
    }
  }

  cancelEdit() {
    if (this.originalAdministrator) {
      this.originalAdministrator = { ...this.originalAdministrator };
      this.isEditing = false;
    } else {
      console.error('Original company administrator data is undefined.');
    }
  }
}
