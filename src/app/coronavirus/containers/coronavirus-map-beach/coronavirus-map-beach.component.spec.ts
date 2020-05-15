import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapBeachComponent } from './coronavirus-map-beach.component';

describe('CoronavirusMapBeachComponent', () => {
  let component: CoronavirusMapBeachComponent;
  let fixture: ComponentFixture<CoronavirusMapBeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapBeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
