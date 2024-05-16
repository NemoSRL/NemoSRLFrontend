import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const READ_ALL_ENDPOINT="ciao";
const READ_CLIENTI_BY="ciao";
const UPDATE_PRODOTTO="ciao";

export interface Cliente{
  readonly cf?: string,
  readonly nome?:string,
  readonly cognome?:string,
  readonly email?:string,
  readonly eta:number,
  readonly sesso:string,
  readonly telefono:string,

}

@Injectable({
  providedIn: 'root'
})
export class ClienteService{
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) { }

  public readAllClienti(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${READ_ALL_ENDPOINT}`)
  }

  public readClienteBy(cliente:Cliente):Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/${READ_CLIENTI_BY}`)
  }

  public updateCliente(cliente:Cliente):Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_PRODOTTO}`,cliente)
  }
}
