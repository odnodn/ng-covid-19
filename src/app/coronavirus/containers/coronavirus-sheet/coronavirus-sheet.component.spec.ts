import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusSheetComponent } from './coronavirus-sheet.component';

describe('CoronavirusSheetComponent', () => {
  let component: CoronavirusSheetComponent;
  let fixture: ComponentFixture<CoronavirusSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
