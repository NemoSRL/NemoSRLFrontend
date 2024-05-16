import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const READ_ALL_ENDPOINT="ciao";
const READ_CLIENTI_BY="ciao";
const UPDATE_PRODOTTO="ciao";
const READ_CLIENTE_BY_ID="ciao";
const GET_ATTRIBUTI="ciao";
const DELETE_CLIENTE="ciao";
const ADD_CLIENTE="ciao";

export interface Cliente{
  readonly cf?: string,
  readonly nome?:string,
  readonly cognome?:string,
  readonly email?:string,
  readonly eta?:number,
  readonly sesso?:string,
  readonly telefono?:string,

}

export type id=string;

@Injectable({
  providedIn: 'root'
})
export class ClienteService{
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) { }

  public addCliente(cliente:Cliente):Observable<Cliente>{
    return this.httpClient.post<Cliente>(`${this.apiUrl}/${ADD_CLIENTE}`,cliente)
  }

  public readAllClienti(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${READ_ALL_ENDPOINT}`)
  }

  public readClienteBy(cliente:Cliente):Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${READ_CLIENTI_BY}`)
  }

  public readClienteById(id:id):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${READ_CLIENTE_BY_ID}/${id}`)
  }
  public updateCliente(cliente:Cliente):Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_PRODOTTO}`,cliente)
  }
  public getAttributi():Observable<string>{
    return this.httpClient.get<string>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
  }
  public deleteCliente(id:id):Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.apiUrl}/${DELETE_CLIENTE}/${id}`)
  }
}
