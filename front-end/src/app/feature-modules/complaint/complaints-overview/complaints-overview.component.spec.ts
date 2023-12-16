import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsOverviewComponent } from './complaints-overview.component';

describe('ComplaintsOverviewComponent', () => {
  let component: ComplaintsOverviewComponent;
  let fixture: ComponentFixture<ComplaintsOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintsOverviewComponent]
    });
    fixture = TestBed.createComponent(ComplaintsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
