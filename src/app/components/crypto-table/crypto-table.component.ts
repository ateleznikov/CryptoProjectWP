import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from '../../services/crypto-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {

  cryptoData: any[] | undefined;

  constructor(private cryptoApiService: CryptoApiService) { }

  ngOnInit(): void {
    this.getCryptoData();
  }

  getCryptoData(): void {
    this.cryptoApiService.getCryptoData('eur', 25)
      .subscribe(data => {
        this.cryptoData = data;
      });
  }
}
