import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapDeconfinementComponent } from './coronavirus-map-deconfinement.component';

describe('CoronavirusMapDeconfinementComponent', () => {
  let component: CoronavirusMapDeconfinementComponent;
  let fixture: ComponentFixture<CoronavirusMapDeconfinementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapDeconfinementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapDeconfinementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
