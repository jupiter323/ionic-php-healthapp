import { TestBed } from '@angular/core/testing';

import { HiitService } from './hiit.service';

describe('HiitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiitService = TestBed.get(HiitService);
    expect(service).toBeTruthy();
  });
});
