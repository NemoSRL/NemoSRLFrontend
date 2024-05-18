import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdineInUscita {
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

const ADD_ORDINE = 'ordini';
const GET_ALL_ORDINI = 'ordini';
const GET_ORDINI_BY = 'ordini';
const GET_ATTRIBUTI = 'ordini';
const UPDATE_ORDINE = 'ordini';
const DELETE_ORDINE = 'ordini';

@Injectable({
  providedIn: 'root',
})
export class OrdineUscitaService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public addOrdineInUscita(posizione: OrdineInUscita): Observable<OrdineInUscita> {
    return this.httpClient.post<OrdineInUscita>(
      `${this.apiUrl}/${ADD_ORDINE}`,
      posizione
    );
  }

  public getAllOrdini(): Observable<OrdineInUscita[]> {
    return this.httpClient.get<OrdineInUscita[]>(
      `${this.apiUrl}/${GET_ALL_ORDINI}`
    );
  }

  public getOrdiniBy(attributo: string,
    ricerca: string): Observable<OrdineInUscita[]> {
      return this.httpClient.get<OrdineInUscita[]>(`${this.apiUrl}/${GET_ORDINI_BY}`, {
        params: { attributo, ricerca },
      });
  }

  public getAttributi(): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/${GET_ATTRIBUTI}`);
  }

  public updateOrdineInUscita(posizione: OrdineInUscita): Observable<Object> {
    return this.httpClient.put<object>(
      `${this.apiUrl}/${UPDATE_ORDINE}`,
      posizione
    );
  }

  public deleteOrdineInUscita(id: number): Observable<OrdineInUscita> {
    return this.httpClient.delete<OrdineInUscita>(
      `${this.apiUrl}/${DELETE_ORDINE}/${id}`
    );
  }
}
