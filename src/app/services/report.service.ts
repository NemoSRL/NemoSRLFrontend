import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { read } from '@popperjs/core';
import { Observable } from 'rxjs';

const GET_ALL_REPORTS = 'report';
const GET_REPORTS_BY = 'report/ricerca';
const GET_ATTRIBUTI = 'report';
const UPDATE_REPORT = 'report';
const DELETE_REPORT = 'report';
const ADD_REPORT = 'report';
const GET_REPORT_BY_ID = 'report';
export interface Report {
  readonly np?: number;
  readonly etichetta?: number;
  readonly data?: Date;
  readonly dettagli?: string;
  readonly personale?: string;
  readonly oldEtichetta?: number
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  public addReport(report: Report): Observable<Report> {
    return this.httpClient.post<Report>(`${this.apiUrl}/${ADD_REPORT}`, report);
  }
  public getAllReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.apiUrl}/${GET_ALL_REPORTS}`);
  }

  public getReportById(id: number, etichetta: number): Observable<Report> {
    const url = `${this.apiUrl}/${GET_REPORT_BY_ID}/${id}/${etichetta}`;
    return this.httpClient.get<Report>(url);
  }
  public getReportsBy(
    attributo: string,
    ricerca: string
  ): Observable<Report[]> {
    if(attributo==="data"){
      return this.httpClient.get<Report[]>(`${this.apiUrl}/${GET_ALL_REPORTS}/ricercaPer/${ricerca}`);
    }else{
      return this.httpClient.get<Report[]>(`${this.apiUrl}/${GET_REPORTS_BY}`, {
        params: { [attributo] : ricerca },
      });
    }
  }

  public getAttributi(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/${GET_ATTRIBUTI}`);
  }

  public updateReport(report?: Report) {
    return this.httpClient.put(`${this.apiUrl}/${UPDATE_REPORT}`, report);
  }

  public deleteReport(codice: number, etichetta: number): Observable<Report> {
    const url = `${this.apiUrl}/${DELETE_REPORT}/${codice}`;
    return this.httpClient.delete<Report>(url, { body: { codice, etichetta } });
  }
}
