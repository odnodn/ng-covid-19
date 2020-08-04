import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusSheetEpidemicComponent } from './coronavirus-sheet-epidemic.component';

describe('CoronavirusSheetEpidemicComponent', () => {
  let component: CoronavirusSheetEpidemicComponent;
  let fixture: ComponentFixture<CoronavirusSheetEpidemicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusSheetEpidemicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusSheetEpidemicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
