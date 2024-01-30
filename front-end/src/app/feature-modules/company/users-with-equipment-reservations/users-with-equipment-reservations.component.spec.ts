import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithEquipmentReservationsComponent } from './users-with-equipment-reservations.component';

describe('UsersWithEquipmentReservationsComponent', () => {
  let component: UsersWithEquipmentReservationsComponent;
  let fixture: ComponentFixture<UsersWithEquipmentReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersWithEquipmentReservationsComponent]
    });
    fixture = TestBed.createComponent(UsersWithEquipmentReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
