import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { read } from '@popperjs/core';
import { Observable } from 'rxjs';

const READ_ALL_REPORT="ciao";
const READ_BY_REPORT="ciao";
const GET_ATTRIBUTI="ciao";
const UPDATE_REPORT="ciao";
const DELETE_REPORT="ciao";
const ADD_REPORT="ciao";

export interface Report{
    readonly id:number
    readonly etichetta:number
    readonly data: Date
    readonly dettagli: string
    readonly personale: number
}

export interface ReportParziale{
  readonly etichetta?:number
  readonly data?: Date
  readonly dettagli?: string
  readonly personale?: number
}
    export type Codice=number
    export type Data=Date
    export type Operaio=number
    export type Peso=number
    export type Tipologia=string

@Injectable({
    providedIn: 'root'
  })
export class ReportService{

    constructor(
        @Inject('API_URL') private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) { }

    public addReport(report:Report): Observable<Report>{
      return this.httpClient.post<Report>(`${this.apiUrl}/${ADD_REPORT}`,
        report)
    }
    public readAllReport(): Observable<Report[]>{
        return this.httpClient.get<Report[]>(`${this.apiUrl}/${READ_ALL_REPORT}`)
    }

    public readByReport(data:Data,personale:Operaio,peso:Peso,tipologia:Tipologia): Observable<Report[]>{
        return this.httpClient.get<Report[]>(`${this.apiUrl}/${READ_BY_REPORT  }`,
            {params:{data: data.toISOString(),personale,peso,tipologia }}
        )
    }

    public getAttributi(): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
    }

    public updateReport(Report:ReportParziale){
        return this.httpClient.put(`${this.apiUrl}/${UPDATE_REPORT}`,Report)
    }

    public deleteReport(codice:Codice){
        return this.httpClient.delete(`${this.apiUrl}/${DELETE_REPORT}`,{body:{codice}})
    }
}
