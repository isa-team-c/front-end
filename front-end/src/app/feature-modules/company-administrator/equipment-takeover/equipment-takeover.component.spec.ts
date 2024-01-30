import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTakeoverComponent } from './equipment-takeover.component';

describe('EquipmentTakeoverComponent', () => {
  let component: EquipmentTakeoverComponent;
  let fixture: ComponentFixture<EquipmentTakeoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentTakeoverComponent]
    });
    fixture = TestBed.createComponent(EquipmentTakeoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
