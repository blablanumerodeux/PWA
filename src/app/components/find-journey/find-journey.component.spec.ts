import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJourneyComponent } from './find-journey.component';

describe('FindJourneyComponent', () => {
  let component: FindJourneyComponent;
  let fixture: ComponentFixture<FindJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
