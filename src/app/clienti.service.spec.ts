import { TestBed } from '@angular/core/testing';

import {ClientiService} from "../clienti.service";

describe('EtichetteService', () => {
  let service: ClientiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
