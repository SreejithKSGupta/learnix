import { TestBed } from '@angular/core/testing';

import { UserchoicesService } from './userchoices.service';

describe('UserchoicesService', () => {
  let service: UserchoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserchoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
