import { TestBed } from '@angular/core/testing';

import { CoronavirusFranceRegionService } from './coronavirus-france-region.service';

describe('CoronavirusFranceRegionService', () => {
  let service: CoronavirusFranceRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusFranceRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
