import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusGraphMeasureComponent } from './coronavirus-graph-measure.component';

describe('CoronavirusGraphMeasureComponent', () => {
  let component: CoronavirusGraphMeasureComponent;
  let fixture: ComponentFixture<CoronavirusGraphMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusGraphMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusGraphMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
