import { TestBed } from '@angular/core/testing';

import { TourInventoryService } from './tour-inventory.service';

describe('TourInventoryService', () => {
  let service: TourInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
