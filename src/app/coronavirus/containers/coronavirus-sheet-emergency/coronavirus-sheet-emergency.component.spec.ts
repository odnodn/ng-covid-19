import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusSheetEmergencyComponent } from './coronavirus-sheet-emergency.component';

describe('CoronavirusSheetEmergencyComponent', () => {
  let component: CoronavirusSheetEmergencyComponent;
  let fixture: ComponentFixture<CoronavirusSheetEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusSheetEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusSheetEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
