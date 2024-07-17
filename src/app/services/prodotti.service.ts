import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_ALL_PRODOTTI = 'prodotti';
const GET_PRODOTTI_BY = 'prodotti/ricerca';
const UPDATE_PRODOTTO = 'prodotti';
const DELETE_PRODOTTO = 'prodotti/elimina';
const GET_ATTRIBUTI = 'prodotti';
const GET_PRODOTTO_BY_ID = 'prodotti';
export interface Prodotto {
  id?: number;
  nome?: string;
  quantita?: number;
  sogliaminima?: number;
  qualita?: string;
}

export type Codice = number;
export type Nome = string;

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public getAllProdotti(): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(
      `${this.apiUrl}/${GET_ALL_PRODOTTI}`
    );
  }

  public getProdottiBy(
    attributo: string,
    ricerca: string
  ): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(
      `${this.apiUrl}/${GET_PRODOTTI_BY}`,
      { params: { [attributo] : ricerca } }
    );
  }

  public getProdottoById(id: number): Observable<Prodotto> {
    return this.httpClient.get<Prodotto>(
      `${this.apiUrl}/${GET_PRODOTTO_BY_ID}/${id}`,
      { params: { id } }
    );
  }
  public updateProdotto(prodotto?: Prodotto) {
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_PRODOTTO}`, prodotto);
  }

  public getAttributi(): Observable<string[]> {
    const url1 = `${this.apiUrl}/${GET_ATTRIBUTI}`;
    return this.httpClient.get<string[]>(url1);
  }

  public deleteProdotto(codice: Codice) {
    const url = `${this.apiUrl}/${DELETE_PRODOTTO}/${codice}`;
    return this.httpClient.get(url);
  }
}
