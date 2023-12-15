import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdministratorUpdateComponent } from './company-administrator-update.component';

describe('CompanyAdministratorUpdateComponent', () => {
  let component: CompanyAdministratorUpdateComponent;
  let fixture: ComponentFixture<CompanyAdministratorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdministratorUpdateComponent]
    });
    fixture = TestBed.createComponent(CompanyAdministratorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
