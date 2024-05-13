import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from '../../services/crypto-api.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favourite.service';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {

  cryptoData: any[] | undefined;

  constructor(
    private cryptoApiService: CryptoApiService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.getCryptoData();
  }

  getCryptoData(): void {
    this.cryptoApiService.getCryptoData('eur', 10)
    .subscribe(data => {
      this.cryptoData = data.map(crypto => {
        crypto.price_change_percentage_24h = crypto.price_change_percentage_24h.toFixed(2);
        crypto.current_price = '€' + crypto.current_price.toFixed(2);

        crypto.total_volume = this.formatVolume(crypto.total_volume);

        crypto.market_cap = this.formatMarketCap(crypto.market_cap);

        return crypto;
      });
    });
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
  addToFavorites(crypto: any): void {
    this.favoriteService.addToFavorites(crypto.id)
      .subscribe(
        response => {
          console.log('Crypto added to favorites:', response);
          this.favoriteService.favoritesUpdated.next();
        },
        error => {
          console.error('Error adding crypto to favorites:', error);
        }
      );
  }
}

