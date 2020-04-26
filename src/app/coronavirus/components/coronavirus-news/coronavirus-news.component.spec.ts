import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusNewsComponent } from './coronavirus-news.component';

describe('CoronavirusNewsComponent', () => {
  let component: CoronavirusNewsComponent;
  let fixture: ComponentFixture<CoronavirusNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
