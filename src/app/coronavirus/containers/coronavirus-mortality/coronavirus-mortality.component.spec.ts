import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMortalityComponent } from './coronavirus-mortality.component';

describe('CoronavirusMortalityComponent', () => {
  let component: CoronavirusMortalityComponent;
  let fixture: ComponentFixture<CoronavirusMortalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMortalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMortalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
