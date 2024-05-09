import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from '../../services/crypto-api.service';
import { ExchangeRate } from '../../interfaces/ExchangeRate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {
  assetIds: string[] = ['ETH', 'BNB', 'XRP', 'SOL', 'TON', 'ADA', 'LTC', 'DOT', 'MATIC', 'AVAX', 'LINK'];
  exchangeRates: ExchangeRate[] = [];

  

  constructor(private cryptoApiService: CryptoApiService) {}

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates() {
    this.assetIds.forEach((assetId, index) => {
      setTimeout(() => {
        this.cryptoApiService.getExchangeRate(assetId, 'EUR')
          .subscribe(
            (rate: ExchangeRate) => {
              this.exchangeRates.push(rate);
            },
            (error) => {
              console.error('Error fetching exchange rate:', error);
            }
          );
      }, index * 1000);
    });
  }

  
}
