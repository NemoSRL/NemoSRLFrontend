import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { read } from '@popperjs/core';
import { Observable } from 'rxjs';

const READ_ALL_REPORT="report";
const READ_BY_REPORT="report";
const GET_ATTRIBUTI="report";
const UPDATE_REPORT="report";
const DELETE_REPORT="report";
const ADD_REPORT="report";

export interface Report{
    readonly id?:number
    readonly etichetta?:number
    readonly data?: Date
    readonly dettagli?: string
    readonly personale?: string
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

    public readReportBy(attributo: string ,ricerca :string): Observable<Report[]>{
        return this.httpClient.get<Report[]>(`${this.apiUrl}/${READ_BY_REPORT  }`,
            {params:{attributo, ricerca }}
        )
    }

    public getAttributi(): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`)
    }

    public updateReport(Report:Report):Observable<Report>{
        return this.httpClient.put<Report>(`${this.apiUrl}/${UPDATE_REPORT}`,Report)
    }

    public deleteReport(codice:Codice) :Observable<Report>{
        return this.httpClient.delete<Report>(`${this.apiUrl}/${DELETE_REPORT}`,{body:{codice}})
    }
}
