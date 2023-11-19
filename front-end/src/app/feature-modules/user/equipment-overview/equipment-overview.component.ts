import { Component } from '@angular/core';
import { Equipment } from '../model/equipment.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-equipment-overview',
  templateUrl: './equipment-overview.component.html',
  styleUrls: ['./equipment-overview.component.css']
})
export class EquipmentOverviewComponent {
  equipment: Equipment[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.userService.getAllEquipment().subscribe(
      (data) => {
        this.equipment = data;
      },
      (error) => {
        console.error('Error loading equipment:', error);
      }
    );
  }
  
}
