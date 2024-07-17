import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

const GET_ALL_ETICHETTE = 'etichette';
const GET_ETICHETTE_BY = 'etichette/ricerca';
const UPDATE_ETICHETTA = 'etichette';
const DELETE_ETICHETTA = 'etichette';
const GET_ATTRIBUTI = 'etichette';
const ADD_ETICHETTA = 'etichette';
const GET_ETICHETTA_BY_ID = 'etichette';

export interface Etichetta {
  id?: number;
  dataarrivo?: Date;
  descrizione?: string;
  abbattimento?: boolean;
  peso?: number;
  prodotto?: number;
  scontoextra?: number;
  posizioneid?: string;
  posizionenp?: number;
  posizionetipo?:string;
  posizioneluogo?:string;
  oldPosizioneId?: string;
  oldPosizioneNp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class EtichetteService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public addEtichetta(etichetta: Etichetta): Observable<Etichetta> {
    return this.httpClient.post<Etichetta>(
      `${this.apiUrl}/${ADD_ETICHETTA}`,
      etichetta
    );
  }

  public readAllEtichette(): Observable<Etichetta[]> {
    return this.httpClient.get<Etichetta[]>(
      `${this.apiUrl}/${GET_ALL_ETICHETTE}`
    );
  }

  public readEtichetteBy(
    attributo: string,
    valore: string
  ): Observable<Etichetta[]> {
    if (attributo==="data"){
      return this.httpClient.get<Etichetta[]>(
        `${this.apiUrl}/${GET_ALL_ETICHETTE}/ricercaPerData/${valore}`,
      );
    } else{
      return this.httpClient.get<Etichetta[]>(
        `${this.apiUrl}/${GET_ETICHETTE_BY}`,
        { params: { attributo, valore } }
      );

    }
  }

  public updateEtichetta(etichetta: Etichetta): Observable<Etichetta> {
    return this.httpClient.put<Etichetta>(
      `${this.apiUrl}/${UPDATE_ETICHETTA}`,
      etichetta
    );
  }

  public deleteEtichette(codice: number): Observable<Etichetta> {
    const url = `${this.apiUrl}/${DELETE_ETICHETTA}/${codice}`;
    return this.httpClient.delete<Etichetta>(
      url, { body: { codice } });
  }

  public getAttributi(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`);
  }

  public readEtichettaById(codice: number): Observable<Etichetta> {
    return this.httpClient.get<Etichetta>(
      `${this.apiUrl}/${GET_ETICHETTA_BY_ID}/${codice}`
    );
  }
}
