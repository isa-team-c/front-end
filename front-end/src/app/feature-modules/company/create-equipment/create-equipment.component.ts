import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Equipment } from '../../user/model/equipment.model';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.css']
})
export class CreateEquipmentComponent {

  
  creationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  constructor(private service: CompanyService) { }

  onSubmit(): void {
    if (this.creationForm.valid) {
      
      const newEquipment: Equipment = {
        id: 0,
        name: this.creationForm.value.name || '',
        type: this.creationForm.value.type || '',
        description: this.creationForm.value.description || '',
        quantity: +this.creationForm.value.quantity! || 0
      };

      this.service.createEquipment(newEquipment)
        .subscribe(
          () => {
            alert('Equipment created successfully!');
            // Dodatna logika nakon uspešnog kreiranja opreme
          },
          (error) => {
            console.error('Error creating equipment:', error);
            // Obrada grešaka prilikom kreiranja opreme
          }
        );
    }
  }
}
