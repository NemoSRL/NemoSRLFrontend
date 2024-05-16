import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';


const READ_ALL_ETICHETTE_ENDPOINT="etichette";
const READ_BY_ETICHETTE_ENDPOINT="etichette";
const UPDATE_ETICHETTE="etichette";
const DELETE_ETICHETTE="etichette";
const GET_ATTRIBUTI="etichette";
const ADD_ETICHETTA="etichette";
const READ_ETICHETTA_BY_ID_ENDPOINT="";

export interface etichette{
    readonly id?: number
    readonly dataarrivo?: Date
    readonly descrizione?: string
    readonly abbattimento?: boolean
    readonly peso?: number
    readonly prodotto?: string
    readonly venditanp?: number
    readonly venditadata?: Date
    readonly ordineUscita?: number
    readonly scontoextra?: number
    readonly posizioneid?: number
    readonly posizionenp?: number
    readonly prenotazione?: string
}


export type Codice=number
export type DataArrivo=Date
export type Peso=number
export type PosizioneId=number
export type PosizioneNp=number
export type DataUltimoControllo=Date
export type Tipologia=string


@Injectable({
    providedIn: 'root'
  })
export class EtichetteService{
    constructor(
        @Inject('API_URL') private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {  }

  public addEtichetta(etichetta:etichette):Observable<etichette>{
      return this.httpClient.post<etichette>(`${this.apiUrl}/${ADD_ETICHETTA}`,etichetta)
  }


  public readAllEtichette():Observable<etichette[]>{
        return this.httpClient.get<etichette[]>(`${this.apiUrl}/${READ_ALL_ETICHETTE_ENDPOINT}`)
  }

  public readEtichetteBy(attributo:string ,valore:string):Observable<etichette[]>{
        return this.httpClient.get<etichette[]>(`${this.apiUrl}/${READ_BY_ETICHETTE_ENDPOINT}`,
         {params:{attributo, valore}})
  }

  public updateEtichetta(etichetta:etichette):Observable<etichette>{
        return this.httpClient.put<etichette>(`${this.apiUrl}/${UPDATE_ETICHETTE}`,etichetta)
  }

  public deleteEtichette(codice:Codice) :Observable<etichette>{
        return this.httpClient.delete<etichette>(`${this.apiUrl}/${DELETE_ETICHETTE}`,
          {body:{codice}})
  }

  public getAttributi():Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
  }

  public readEtichettaById(codice:number): Observable<etichette>{
        return this.httpClient.get<etichette>(`${this.apiUrl}/${READ_ETICHETTA_BY_ID_ENDPOINT}/${codice}`)
  }
}
