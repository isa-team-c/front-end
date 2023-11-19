import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAdministratorComponent } from './create-company-administrator.component';

describe('CreateCompanyAdministratorComponent', () => {
  let component: CreateCompanyAdministratorComponent;
  let fixture: ComponentFixture<CreateCompanyAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyAdministratorComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
