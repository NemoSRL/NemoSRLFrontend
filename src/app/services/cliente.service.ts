import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_ALL_CLIENTI="clienti";
const GET_CLIENTI_BY="clienti";
const UPDATE_CLIENTE="clienti";
const GET_CLIENTE_BY_ID="clienti";
const GET_ATTRIBUTI="clienti";
const DELETE_CLIENTE="clienti";
const ADD_CLIENTE="clienti";

export interface Cliente{
  readonly cf?: string,
  readonly nome?:string,
  readonly cognome?:string,
  readonly telefono?:string,
  readonly email?:string,
  readonly eta?:number,
  readonly sesso?:string,

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

  public getAllClienti(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${GET_ALL_CLIENTI}`)
  }

  public getClienteBy(attributo:string ,valore:string):Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${GET_CLIENTI_BY}`,
         {params:{attributo, valore}})
  }

  public getClienteById(id:id):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${GET_CLIENTE_BY_ID}/${id}`)
  }
  public updateCliente(cliente:Cliente):Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_CLIENTE}`,cliente)
  }
  public getAttributi():Observable<string>{
    return this.httpClient.get<string>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
  }
  public deleteCliente(id:id):Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.apiUrl}/${DELETE_CLIENTE}/${id}`)
  }
}
