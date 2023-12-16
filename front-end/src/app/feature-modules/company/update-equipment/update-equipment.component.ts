import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../user/model/equipment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css']
})
export class UpdateEquipmentComponent implements OnInit{
  selectedEquipment: Equipment | undefined;
  isEditing: boolean = false;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  originalEquipment: Equipment | undefined;
  administratorId!: number;

  constructor(private service: CompanyService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const equipmentId = params['id'];
      this.service.getEquipmentById(equipmentId).subscribe(
        (equipment: Equipment) => {
          this.selectedEquipment = equipment;
          this.originalEquipment = { ...equipment };
          this.updateForm.patchValue({
            name: this.selectedEquipment.name,
            description: this.selectedEquipment.description,
            type: this.selectedEquipment.type,
            quantity: this.selectedEquipment.quantity
          });
          this.isEditing = true;
        },
        (error: any) => {
          console.error('Greška prilikom učitavanja opreme:', error);
        }
      );
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  editEquipment() {
    if (this.originalEquipment) {
      this.isEditing = true;
      this.originalEquipment = { ...this.originalEquipment };
    } else {
      console.error('Selected equipment is undefined.');
    }
  }

  updateEquipment(): void {
    if (this.originalEquipment) {
      this.originalEquipment.name = this.updateForm.value.name!;
      this.originalEquipment.description = this.updateForm.value.description!;
      this.originalEquipment.type = this.updateForm.value.type!;
      this.originalEquipment.quantity = this.updateForm.value.quantity!;
      
      this.service.updateEquipment(this.originalEquipment).subscribe(
        (updatedEquipment: Equipment) => {
          console.log('Received updated equipment data:', updatedEquipment);
          this.originalEquipment = updatedEquipment; // Update the originalEquipment with the updatedEquipment
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating equipment:', error);
        }
      );
    } else {
      console.error('Original equipment data is undefined.');
    }
  }
  

  cancelEdit() {
    if (this.originalEquipment) {
      this.originalEquipment = { ...this.originalEquipment };
      this.isEditing = false;
    } else {
      console.error('Original equipment data is undefined.');
    }
  }
}
