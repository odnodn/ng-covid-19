import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusChartPyramidComponent } from './coronavirus-chart-pyramid.component';

describe('CoronavirusChartPyramidComponent', () => {
  let component: CoronavirusChartPyramidComponent;
  let fixture: ComponentFixture<CoronavirusChartPyramidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusChartPyramidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusChartPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
