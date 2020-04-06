import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusLinksFranceTestComponent } from './coronavirus-links-france-test.component';

describe('CoronavirusLinksFranceTestComponent', () => {
  let component: CoronavirusLinksFranceTestComponent;
  let fixture: ComponentFixture<CoronavirusLinksFranceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusLinksFranceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusLinksFranceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
