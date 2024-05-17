import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_ALL_PERSONALE = 'personale';

export interface Personale {
  readonly cf: string;
  readonly nome: string;
  readonly cognome: string;
  readonly ruolo: string;
  readonly telefono: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonaleService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}
  public getAllPersonale(): Observable<Personale[]> {
    return this.httpClient.get<Personale[]>(
      `${this.apiUrl}/${GET_ALL_PERSONALE}`
    );
  }
}
