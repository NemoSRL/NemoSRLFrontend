import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

const GET_BY_POSITION="slot/ricerca";
export interface Slot{
  posizione : string,
  np : number,
  occupato : boolean
  
}
@Injectable({
  providedIn: 'root'
})
export class SlotService {

  
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  getSlots(posizione : string, occupato : boolean) : Observable<Slot[]>{
    return this.httpClient.get<Slot[]>(`${this.apiUrl}/${GET_BY_POSITION}`, {params : {
      "id" : posizione, "occupato" : occupato
    }})
  }
}
