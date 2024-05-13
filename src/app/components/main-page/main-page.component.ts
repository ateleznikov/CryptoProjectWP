import { Component } from '@angular/core';
import { CryptoTableComponent } from '../crypto-table/crypto-table.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CryptoTableComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  
}
