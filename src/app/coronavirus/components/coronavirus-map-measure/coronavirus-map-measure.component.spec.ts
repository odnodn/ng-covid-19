import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapMeasureComponent } from './coronavirus-map-measure.component';

describe('CoronavirusMapMeasureComponent', () => {
  let component: CoronavirusMapMeasureComponent;
  let fixture: ComponentFixture<CoronavirusMapMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
