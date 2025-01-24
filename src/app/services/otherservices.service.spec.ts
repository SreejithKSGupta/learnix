import { TestBed } from '@angular/core/testing';

import { OtherservicesService } from './otherservices.service';

describe('OtherservicesService', () => {
  let service: OtherservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
