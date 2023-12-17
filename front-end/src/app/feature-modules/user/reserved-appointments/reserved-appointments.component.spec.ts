import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedAppointmentsComponent } from './reserved-appointments.component';

describe('ReservedAppointmentsComponent', () => {
  let component: ReservedAppointmentsComponent;
  let fixture: ComponentFixture<ReservedAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ReservedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
