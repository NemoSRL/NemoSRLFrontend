import { TestBed } from '@angular/core/testing';

import { EtichetteService} from "../etichette.service";

describe('EtichetteService', () => {
  let service: EtichetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtichetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
