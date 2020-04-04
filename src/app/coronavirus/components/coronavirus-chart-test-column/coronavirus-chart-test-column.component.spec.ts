import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusChartTestColumnComponent } from './coronavirus-chart-test-column.component';

describe('CoronavirusChartTestColumnComponent', () => {
  let component: CoronavirusChartTestColumnComponent;
  let fixture: ComponentFixture<CoronavirusChartTestColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusChartTestColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusChartTestColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
