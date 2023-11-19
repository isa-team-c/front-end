import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentOverviewComponent } from './equipment-overview.component';

describe('EquipmentOverviewComponent', () => {
  let component: EquipmentOverviewComponent;
  let fixture: ComponentFixture<EquipmentOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentOverviewComponent]
    });
    fixture = TestBed.createComponent(EquipmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
