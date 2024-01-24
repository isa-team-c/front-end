import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenReservationsComponent } from './taken-reservations.component';

describe('TakenReservationsComponent', () => {
  let component: TakenReservationsComponent;
  let fixture: ComponentFixture<TakenReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakenReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakenReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
