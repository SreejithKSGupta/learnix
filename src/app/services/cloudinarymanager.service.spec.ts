import { TestBed } from '@angular/core/testing';

import { CloudinarymanagerService } from './cloudinarymanager.service';

describe('CloudinarymanagerService', () => {
  let service: CloudinarymanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudinarymanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
