import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipmentComponent } from './update-equipment.component';

describe('UpdateEquipmentComponent', () => {
  let component: UpdateEquipmentComponent;
  let fixture: ComponentFixture<UpdateEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEquipmentComponent]
    });
    fixture = TestBed.createComponent(UpdateEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
