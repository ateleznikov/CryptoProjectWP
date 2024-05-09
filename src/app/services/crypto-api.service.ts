import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  getCryptoData(vsCurrency: string, perPage: number): Observable<any[]> {
    const url = `${this.baseUrl}/coins/markets?vs_currency=${vsCurrency}&per_page=${perPage}`;
    return this.http.get<any[]>(url);
  }
}
