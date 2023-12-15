import { TestBed } from '@angular/core/testing';

import { HungerServiceService } from './hunger-service.service';

describe('HungerServiceService', () => {
  let service: HungerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HungerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
