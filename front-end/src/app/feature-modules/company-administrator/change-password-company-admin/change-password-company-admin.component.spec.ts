import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCompanyAdminComponent } from './change-password-company-admin.component';

describe('ChangePasswordCompanyAdminComponent', () => {
  let component: ChangePasswordCompanyAdminComponent;
  let fixture: ComponentFixture<ChangePasswordCompanyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordCompanyAdminComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
