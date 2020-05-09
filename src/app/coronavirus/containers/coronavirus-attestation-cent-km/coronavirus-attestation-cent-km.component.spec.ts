import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusAttestationCentKmComponent } from './coronavirus-attestation-cent-km.component';

describe('CoronavirusAttestationCentKmComponent', () => {
  let component: CoronavirusAttestationCentKmComponent;
  let fixture: ComponentFixture<CoronavirusAttestationCentKmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusAttestationCentKmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusAttestationCentKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
