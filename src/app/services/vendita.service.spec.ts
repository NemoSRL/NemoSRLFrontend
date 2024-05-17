import { TestBed } from '@angular/core/testing';

import { VenditaService } from './vendita.service';

describe('VenditaService', () => {
  let service: VenditaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenditaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
