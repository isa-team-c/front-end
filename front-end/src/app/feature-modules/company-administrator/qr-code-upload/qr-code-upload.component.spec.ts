import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeUploadComponent } from './qr-code-upload.component';

describe('QrCodeUploadComponent', () => {
  let component: QrCodeUploadComponent;
  let fixture: ComponentFixture<QrCodeUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeUploadComponent]
    });
    fixture = TestBed.createComponent(QrCodeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
