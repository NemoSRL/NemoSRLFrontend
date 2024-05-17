import { TestBed } from '@angular/core/testing';

import { PersonaleService } from './personale.service';

describe('PersonaleService', () => {
  let service: PersonaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
