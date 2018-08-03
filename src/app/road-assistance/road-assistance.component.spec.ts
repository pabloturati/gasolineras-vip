import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadAssistanceComponent } from './road-assistance.component';

describe('RoadAssistanceComponent', () => {
  let component: RoadAssistanceComponent;
  let fixture: ComponentFixture<RoadAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
