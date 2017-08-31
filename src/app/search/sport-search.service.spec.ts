import { TestBed, inject } from '@angular/core/testing';

import { SportSearchService } from './sport-search.service';

describe('SportSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportSearchService]
    });
  });

  it('should be created', inject([SportSearchService], (service: SportSearchService) => {
    expect(service).toBeTruthy();
  }));
});
