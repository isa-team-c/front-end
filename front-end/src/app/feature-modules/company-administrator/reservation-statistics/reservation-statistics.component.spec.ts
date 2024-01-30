import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatisticsComponent } from './reservation-statistics.component';

describe('ReservationStatisticsComponent', () => {
  let component: ReservationStatisticsComponent;
  let fixture: ComponentFixture<ReservationStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationStatisticsComponent]
    });
    fixture = TestBed.createComponent(ReservationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
