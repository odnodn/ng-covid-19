import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapDeconfinementDetailsComponent } from './coronavirus-map-deconfinement-details.component';

describe('CoronavirusMapDeconfinementDetailsComponent', () => {
  let component: CoronavirusMapDeconfinementDetailsComponent;
  let fixture: ComponentFixture<CoronavirusMapDeconfinementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapDeconfinementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapDeconfinementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
