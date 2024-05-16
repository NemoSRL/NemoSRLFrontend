import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_ALL_PRODOTTI= "prodotti";
const GET_PRODOTTI_BY= "ciao";
const UPDATE_PRODOTTO="prodotti";
const DELETE_PRODOTTO="prodotti";
const GET_ATTRIBUTI="prodotti";
const GET_PRODOTTO_BY_ID="prodotti";
export interface Prodotto {
  readonly id? : number;
  readonly nome? : string;
  readonly quantita? : number;
  readonly sogliaminima? : number;
  readonly qualita? : string; 
}

export type Codice = number
export type Nome = string



@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  
  constructor(
    @Inject('API_URL') private readonly apiUrl: string, 
    private readonly httpClient: HttpClient
  ) { }

  public readAllProdotti(): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(`${this.apiUrl}/${GET_ALL_PRODOTTI}`)
  }

  public readProdottiBy(attributo: string ,ricerca :string): Observable<Prodotto[]> {
    return this.httpClient.get<Prodotto[]>(`${this.apiUrl}/${GET_PRODOTTI_BY}`, { params: {attributo,ricerca}})
  }

  public readProdottiById(id: number): Observable<Prodotto> {
    return this.httpClient.get<Prodotto>(`${this.apiUrl}/${GET_PRODOTTO_BY_ID}`, { params: {id}})
  }
  public updateProdotto(prodotto: Prodotto) {
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_PRODOTTO}`,prodotto)
  }

  public getAttributi(): Observable<string[]>{
    const url1=`${this.apiUrl}/${GET_ATTRIBUTI}`
    return this.httpClient.get<string[]>(url1)
  }

  public deleteProdotto(codice:Codice){
    const url= `${this.apiUrl}/${DELETE_PRODOTTO}/${codice}`
    return this.httpClient.delete(url, {body: {codice}})
  }

}
