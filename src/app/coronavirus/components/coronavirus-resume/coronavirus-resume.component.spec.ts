import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusResumeComponent } from './coronavirus-resume.component';

describe('CoronavirusResumeComponent', () => {
  let component: CoronavirusResumeComponent;
  let fixture: ComponentFixture<CoronavirusResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
