import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusNewsPageComponent } from './coronavirus-news-page.component';

describe('CoronavirusNewsPageComponent', () => {
  let component: CoronavirusNewsPageComponent;
  let fixture: ComponentFixture<CoronavirusNewsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusNewsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
