import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasEmergencyComponent } from './gas-emergency.component';

describe('GasEmergencyComponent', () => {
  let component: GasEmergencyComponent;
  let fixture: ComponentFixture<GasEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
