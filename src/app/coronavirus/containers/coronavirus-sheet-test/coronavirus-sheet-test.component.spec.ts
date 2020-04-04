import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusSheetTestComponent } from './coronavirus-sheet-test.component';

describe('CoronavirusSheetTestComponent', () => {
  let component: CoronavirusSheetTestComponent;
  let fixture: ComponentFixture<CoronavirusSheetTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusSheetTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusSheetTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
