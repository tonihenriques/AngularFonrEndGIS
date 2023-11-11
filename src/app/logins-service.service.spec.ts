import { TestBed } from '@angular/core/testing';

import { LoginsServiceService } from './logins-service.service';

describe('LoginsServiceService', () => {
  let service: LoginsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
