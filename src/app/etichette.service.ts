import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';


const READ_ALL_ETICHETTE_ENDPOINT="ciao";
const READ_BY_ETICHETTE_ENDPOINT="ciao";
const UPDATE_ETICHETTE="ciao";
const DELETE_ETICHETTE="ciao";
const GET_ATTRIBUTI="ciao";


export interface etichette{
    readonly codice: number
    readonly dataArrivo: Date
    readonly descrizione: string
    readonly abbattuto: boolean
    readonly peso: number
    readonly prodotto: string
    readonly venditaNP: number
    readonly venditaData: Data
    readonly ordineUscita: number
    readonly cliente: string
    readonly scontoExtra: number
    readonly posizioneId: number
    readonly posizioneNp: number
    readonly prenotazione: string
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
    ) { }

    public readAllEtichette():Observable<etichette[]>{
        return this.httpClient.get<etichette[]>(`${this.apiUrl}/${READ_ALL_ETICHETTE_ENDPOINT}`)
    }

    public readByEtichette(codice:Codice,dataArrivo:DataArrivo,
        peso:Peso,posizioneId:PosizioneId,posizioneNp:PosizioneNp,
        duc:DataUltimoControllo,tipologia:Tipologia):Observable<etichette[]>{
        return this.httpClient.get<etichette[]>(`${this.apiUrl}/${READ_BY_ETICHETTE_ENDPOINT}`,
         {params:{codice,dataArrivo: dataArrivo.toISOString(), peso 
         ,posizioneId,posizioneNp,duc: duc.toISOString(),tipologia}})
    }

    public updateEtichetta(etichetta:etichette){
        return this.httpClient.put(`${this.apiUrl}/${UPDATE_ETICHETTE}`,etichetta)
    }

    public deleteEtichette(codice:Codice){
        return this.httpClient.delete(`${this.apiUrl}/${DELETE_ETICHETTE}`,{body:{codice}})
    }

    public getAttributi():Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
    }
}