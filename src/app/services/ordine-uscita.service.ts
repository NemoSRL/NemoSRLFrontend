import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdineUscita {
  readonly id: number;
  readonly data: Date;
  readonly datainvio: Date;
  readonly dataconsegna: Date;
  readonly stato: string;
  readonly tracciamento: string;
  readonly indirizzoconsegna: string;
  readonly corriere: string;
  readonly referenteazienda: string;
}

const ADD_ORDINE = 'ciao';
const GET_ALL_ORDINI = 'ciao';
const GET_ORDINI_BY = 'ciao';
const GET_ATTRIBUTI = 'ciao';
const UPDATE_ORDINE = 'ciao';
const DELETE_ORDINE = 'ciao';

@Injectable({
  providedIn: 'root',
})
export class OrdineUscitaService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public addOrdineUscita(posizione: OrdineUscita): Observable<OrdineUscita> {
    return this.httpClient.post<OrdineUscita>(
      `${this.apiUrl}/${ADD_ORDINE}`,
      posizione
    );
  }

  public getAllOrdini(): Observable<OrdineUscita[]> {
    return this.httpClient.get<OrdineUscita[]>(
      `${this.apiUrl}/${GET_ALL_ORDINI}`
    );
  }

  public getOrdiniBy(attributo: string,
    ricerca: string): Observable<OrdineUscita[]> {
      return this.httpClient.get<OrdineUscita[]>(`${this.apiUrl}/${GET_ORDINI_BY}`, {
        params: { attributo, ricerca },
      });
  }

  public getAttributi(): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/${GET_ATTRIBUTI}`);
  }

  public updateOrdineUscita(posizione: OrdineUscita): Observable<Object> {
    return this.httpClient.put<object>(
      `${this.apiUrl}/${UPDATE_ORDINE}`,
      posizione
    );
  }

  public deleteOrdineUscita(id: number): Observable<OrdineUscita> {
    return this.httpClient.delete<OrdineUscita>(
      `${this.apiUrl}/${DELETE_ORDINE}/${id}`
    );
  }
}
