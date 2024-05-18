import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Posizione {
  readonly id?: string;
  readonly np?: number;
  readonly tipo?: string;
  readonly sogliaMinima?: number;
}

export type id = number;

const ADD_POSIZIONE = 'posizioni';
const GET_ALL_POSIZIONI = 'posizioni';
const GET_POSIZIONI_BY = 'posizioni';
const GET_ATTRIBUTI = 'posizioni';
const UPDATE_POSIZIONE = 'posizioni';
const DELETE_POSIZIONE = 'posizioni';

@Injectable({
  providedIn: 'root',
})
export class PosizioneService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public addPosizione(posizione: Posizione): Observable<Posizione> {
    return this.httpClient.post<Posizione>(
      `${this.apiUrl}/${ADD_POSIZIONE}`,
      posizione
    );
  }

  public getAllPosizioni(): Observable<Posizione[]> {
    return this.httpClient.get<Posizione[]>(
      `${this.apiUrl}/${GET_ALL_POSIZIONI}`
    );
  }

  public getPosizioniBy(attributo: string,
    ricerca: string): Observable<Posizione[]> {
      return this.httpClient.get<Posizione[]>(`${this.apiUrl}/${GET_POSIZIONI_BY}`, {
        params: { attributo, ricerca },
      });
  }

  public getAttributi(): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/${GET_ATTRIBUTI}`);
  }

  public updatePosizione(posizione: Posizione): Observable<Object> {
    return this.httpClient.put<object>(
      `${this.apiUrl}/${UPDATE_POSIZIONE}`,
      posizione
    );
  }

  public deletePosizione(id: id): Observable<Posizione> {
    return this.httpClient.delete<Posizione>(
      `${this.apiUrl}/${DELETE_POSIZIONE}/${id}`
    );
  }
}
