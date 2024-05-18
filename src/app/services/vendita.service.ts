import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_ALL_VENDITA = 'vendite';

export interface Vendita {
  np: number,
  data: Date,
  tipologia:string
}
@Injectable({
  providedIn: 'root',
})
export class VenditaService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}
  public getAllVendita(): Observable<Vendita[]> {
    return this.httpClient.get<Vendita[]>(
      `${this.apiUrl}/${GET_ALL_VENDITA}`
    );
  }
}