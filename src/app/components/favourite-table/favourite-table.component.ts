import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favourite.service';
import { FavouriteCryptoApiService } from '../../services/favourite-api.service';

@Component({
  selector: 'app-favourite-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-table.component.html',
  styleUrl: './favourite-table.component.css'
})

export class FavouriteTableComponent implements OnInit {
  favouriteCryptos: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private favouriteCryptoApiService: FavouriteCryptoApiService
  ) { }  

  ngOnInit(): void {
    this.getFavouriteCryptos();
    this.favoriteService.favoritesUpdated.subscribe(() => {
      this.getFavouriteCryptos();
    });
  }

  getFavouriteCryptos(): void {
    this.favoriteService.getFavorites().subscribe(
      (response: any) => {
        if (response && response.favouriteCrypto) {
          const favouriteIds = response.favouriteCrypto.map((crypto: any) => crypto.id);
          console.log('Fetched IDs:', favouriteIds);
          if (favouriteIds.length === 0) {
            console.warn('No favorites found in the database.');
            this.favouriteCryptos = [];
          } else {
            this.fetchCryptoData(favouriteIds);
          }
        } else {
          console.warn('No favorites found in the response.');
          this.favouriteCryptos = []; 
        }
      },
      (error: any) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }

  fetchCryptoData(ids: string[]): void {
    console.log('IDs received in fetchCryptoData:', ids);
    this.favouriteCryptoApiService.getFavouriteCryptoData('eur', ids).subscribe(
      (data: any) => {
        console.log('API response:', data);
        this.favouriteCryptos = data.map((crypto: any) => {
          crypto.price_change_percentage_24h = crypto.price_change_percentage_24h.toFixed(2);
          crypto.current_price = '€' + crypto.current_price.toFixed(2);
          crypto.total_volume = this.formatVolume(crypto.total_volume);
          crypto.market_cap = this.formatMarketCap(crypto.market_cap);
          return crypto;
        });
        console.log('Mapped favouriteCryptos:', this.favouriteCryptos);
      },
      (error: any) => {
        console.error('Error fetching crypto data:', error);
      }
    );
  }
  removeFromFavorites(crypto: any): void {
    this.favoriteService.deleteFromFavorites(crypto.id).subscribe(
      () => {
        console.log('Crypto removed from favorites:', crypto);
        this.getFavouriteCryptos();
      },
      (error: any) => {
        console.error('Error removing crypto from favorites:', error);
      }
    );
  }

  private formatVolume(volume: number): string {
    if (volume >= 1e12) {
      return (volume / 1e12).toFixed(1) + 'T';
    } else if (volume >= 1e9) {
      return (volume / 1e9).toFixed(1) + 'B';
    } else if (volume >= 1e6) {
      return (volume / 1e6).toFixed(1) + 'M';
    } else if (volume >= 1e3) {
      return (volume / 1e3).toFixed(1) + 'K';
    } else {
      return volume.toFixed(0);
    }
  }
  private formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) {
      return (marketCap / 1e12).toFixed(1) + 'T';
    } else if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(1) + 'B';
    } else if (marketCap >= 1e6) {
      return (marketCap / 1e6).toFixed(1) + 'M';
    } else if (marketCap >= 1e3) {
      return (marketCap / 1e3).toFixed(1) + 'K';
    } else {
      return marketCap.toFixed(0);
    }
  }
  
}
