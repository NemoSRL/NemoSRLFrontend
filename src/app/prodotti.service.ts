import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const READ_ALL_ENDPOINT= "prodotti";
const READ_BY= "ciao";
const UPDATE_PRODOTTO_ENDPOINT="ciao";
const DELETE_PRODOTTO_ENDPOINT="ciao";
const GET_ATTRIBUTI_ENDPOINT="ciao";
const ADD_PRODOTTO="ciao";

export interface Prodotto {
  readonly id?: number;
  readonly nome?: string;
  readonly quantita?: number;
  readonly sogliaminima?: number;
  readonly qualita?: string;
}

export type Codice = number
export type Nome = string
export type DataArrivo= Date


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) { }

  public addProdotto(prodotto:Prodotto): Observable<Prodotto>{
    return this.httpClient.post<Prodotto>(`${this.apiUrl}/${ADD_PRODOTTO}`,prodotto)
  }

  public readAllProdotti(): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(`${this.apiUrl}/${READ_ALL_ENDPOINT}`)
  }

  public readProdottiBy(codice:Codice,nome:Nome,dataArrivo:DataArrivo): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(`${this.apiUrl}/${READ_BY}`, { params: {codice,nome,dataArrivo: dataArrivo.toISOString()}})
  }

  public updateProdotto(prodotto: Prodotto) :Observable<Prodotto> {
    return this.httpClient.put<Prodotto>(`${this.apiUrl}/${UPDATE_PRODOTTO_ENDPOINT}`,prodotto)
  }

  public getAttributi(): Observable<string[]>{
    const url1=`${this.apiUrl}/${GET_ATTRIBUTI_ENDPOINT}`
    return this.httpClient.get<string[]>(url1)
  }

  public deleteProdotto(codice:Codice) :Observable<Prodotto>{
    const url= `${this.apiUrl}/${DELETE_PRODOTTO_ENDPOINT}`
    return this.httpClient.delete<Prodotto>(url, {body: {codice}})
  }

}
