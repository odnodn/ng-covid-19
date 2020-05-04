import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusHeatMapComponent } from './coronavirus-heat-map.component';

describe('CoronavirusHeatMapComponent', () => {
  let component: CoronavirusHeatMapComponent;
  let fixture: ComponentFixture<CoronavirusHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusHeatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
