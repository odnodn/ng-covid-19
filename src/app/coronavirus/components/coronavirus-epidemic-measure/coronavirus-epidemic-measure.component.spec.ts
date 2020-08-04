import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusEpidemicMeasureComponent } from './coronavirus-epidemic-measure.component';

describe('CoronavirusEpidemicMeasureComponent', () => {
  let component: CoronavirusEpidemicMeasureComponent;
  let fixture: ComponentFixture<CoronavirusEpidemicMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusEpidemicMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusEpidemicMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
