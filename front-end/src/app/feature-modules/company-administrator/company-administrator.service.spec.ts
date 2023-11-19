import { TestBed } from '@angular/core/testing';

import { CompanyAdministratorService } from './company-administrator.service';

describe('CompanyAdministratorService', () => {
  let service: CompanyAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
