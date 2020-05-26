import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapTestCentresComponent } from './coronavirus-map-test-centres.component';

describe('CoronavirusMapTestCentresComponent', () => {
  let component: CoronavirusMapTestCentresComponent;
  let fixture: ComponentFixture<CoronavirusMapTestCentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapTestCentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapTestCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
