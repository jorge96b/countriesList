import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCountries(): Observable<any[]>{
    return this.httpClient.get<any[]>(`https://restcountries.com/v3/all`);
  }
}
