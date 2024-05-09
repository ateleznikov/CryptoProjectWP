import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ExchangeRate } from '../interfaces/ExchangeRate';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private apiUrl = 'https://rest.coinapi.io/v1';
  private apiKey = 'F11A11C0-DE92-9917-1665-DB9539B36968';

  constructor(private http: HttpClient) {}

  getExchangeRates(assetIds: string[], quoteAsset: string): Observable<ExchangeRate[]> {
    const requests = assetIds.map(assetId => this.getExchangeRate(assetId, quoteAsset));
    return forkJoin(requests);
  }
  
  getExchangeRate(baseAsset: string, quoteAsset: string): Observable<ExchangeRate> {
    const url = `${this.apiUrl}/exchangerate/${baseAsset}/${quoteAsset}`;
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'X-CoinAPI-Key': this.apiKey
    });
  
    return this.http.get<ExchangeRate>(url, { headers });
  }

  
}
