import { TestBed } from '@angular/core/testing';

import { OrdineUscitaService } from './ordine-uscita.service';

describe('OrdineUscitaService', () => {
  let service: OrdineUscitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdineUscitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
