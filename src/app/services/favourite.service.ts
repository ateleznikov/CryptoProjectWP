// favorite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'http://localhost:5050';
  favoritesUpdated: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  addToFavorites(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/favouriteCrypto`, { id });
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/favouriteCrypto/`);
  }
  deleteFromFavorites(cryptoId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/favourites/${cryptoId}`);
  }
}
