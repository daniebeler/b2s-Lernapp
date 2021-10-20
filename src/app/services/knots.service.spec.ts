import { TestBed } from '@angular/core/testing';

import { KnotsService } from './knots.service';

describe('KnotsService', () => {
  let service: KnotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
