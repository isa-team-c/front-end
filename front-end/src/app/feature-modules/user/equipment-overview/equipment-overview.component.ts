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
  filteredEquipment: Equipment[] = [];
  searchQuery: string = '';
  selectedType: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.userService.getAllEquipment().subscribe(
      (data) => {
        this.equipment = data;
        this.filteredEquipment = [...this.equipment];
      },
      (error) => {
        console.error('Error loading equipment:', error);
      }
    );
  }

  filterEquipment() {
    let filteredByName = this.equipment.filter(equipment =>
      equipment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedType) {
      this.filteredEquipment = filteredByName.filter(equipment =>
        equipment.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    } else {
      this.filteredEquipment = filteredByName;
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedType = '';
    this.filterEquipment();
  }

  getUniqueTypes(): string[] {
    const types = this.equipment.map(equipment => equipment.type);
    return [...new Set(types)];
  }
}
