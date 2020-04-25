import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusTransfertComponent } from './coronavirus-transfert.component';

describe('CoronavirusTransfertComponent', () => {
  let component: CoronavirusTransfertComponent;
  let fixture: ComponentFixture<CoronavirusTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
