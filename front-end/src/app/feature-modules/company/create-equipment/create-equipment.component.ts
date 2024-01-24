import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.css']
})
export class CreateEquipmentComponent implements OnInit{

  
  creationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  company!: Company;

  constructor(private service: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = +params['companyId'];
      if (companyId) {
        // Pozovite servis za dobijanje podataka o kompaniji na osnovu companyId
        this.service.getCompany(companyId).subscribe(
          (company) => {
            this.company = company;
          },
          (error) => {
            console.error('Error fetching company:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.creationForm.valid) {
      
      const newEquipment: Equipment = {
        id: 0,
        name: this.creationForm.value.name || '',
        type: this.creationForm.value.type || '',
        description: this.creationForm.value.description || '',
        quantity: +this.creationForm.value.quantity! || 0,
        reservedQuantity:  0,
        price: 0
      };

      this.service.addEquipmentForCompany(this.company.id,newEquipment).subscribe(
        () => {
          alert('Equipment created successfully!');
          // Ovde možete dodati bilo kakve druge akcije koje želite izvršiti nakon uspešnog kreiranja opreme
        },
        (error) => {
          console.error('Error creating equipment:', error);
          // Ovde možete dodati logiku za rukovanje greškama tokom kreiranja opreme
        }
      );
  }

  }
}
