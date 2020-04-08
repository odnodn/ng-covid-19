import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusChartPieComponent } from './coronavirus-chart-pie.component';

describe('CoronavirusChartGenderComponent', () => {
  let component: CoronavirusChartPieComponent;
  let fixture: ComponentFixture<CoronavirusChartPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusChartPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
