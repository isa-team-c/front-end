import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentOverviewForCompanyComponent } from './equipment-overview-for-company.component';

describe('EquipmentOverviewForCompanyComponent', () => {
  let component: EquipmentOverviewForCompanyComponent;
  let fixture: ComponentFixture<EquipmentOverviewForCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentOverviewForCompanyComponent]
    });
    fixture = TestBed.createComponent(EquipmentOverviewForCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
