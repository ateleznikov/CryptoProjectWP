// favorite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'http://localhost:3000/api/favouriteCrypto';

  constructor(private http: HttpClient) { }

  addToFavorites(cryptoName: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/favouriteCrypto`, { cryptoName });
  }

  getFavorites(u): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/favouriteCrypto/`);
  }
}
