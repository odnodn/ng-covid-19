import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapCentKmComponent } from './coronavirus-map-cent-km.component';

describe('CoronavirusMapCentKmComponent', () => {
  let component: CoronavirusMapCentKmComponent;
  let fixture: ComponentFixture<CoronavirusMapCentKmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapCentKmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapCentKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
