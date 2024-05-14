import { Injectable } from '@angular/core';
import { Country } from './Country';
import { COUNTRIES } from './mock-countries';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  getCountries() : Observable<Country[]>{
    const countries = of(COUNTRIES);
    return countries
  }
  
  constructor() { }
}
