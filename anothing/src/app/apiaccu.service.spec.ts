import { TestBed } from '@angular/core/testing';

import { ApiaccuService } from './apiaccu.service';

describe('ApiaccuService', () => {
  let service: ApiaccuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiaccuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
