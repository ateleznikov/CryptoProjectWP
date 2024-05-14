import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteCryptoApiService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  getFavouriteCryptoData(vsCurrency: string, ids: string[]): Observable<any[]> {
    const idsParam = ids.join(',');
    const url = `${this.baseUrl}/coins/markets?vs_currency=${vsCurrency}&ids=${idsParam}`;

    return this.http.get<any[]>(url);
  }
}