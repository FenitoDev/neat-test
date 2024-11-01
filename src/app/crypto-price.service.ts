import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Cryptos {
  name:
    | 'bitcoin'
    | 'ethereum'
    | 'ripple'
    | 'bitcoin-cash'
    | 'cardano'
    | 'litecoin'
    | 'nem'
    | 'stellar';
  code: 'BTC' | 'ETH' | 'XRP' | 'BCH' | 'ADA' | 'LTC' | 'XEM' | 'XLM';
}

export interface CryptoPrices {
  [key: string]: { usd: number };
}

@Injectable({
  providedIn: 'root',
})
export class CryptoPriceService {
  private apiUrl = environment.apiUrl;
  CRYPTOS = [
    { name: 'bitcoin', code: 'BTC' },
    { name: 'ethereum', code: 'ETH' },
    { name: 'ripple', code: 'XRP' },
    { name: 'bitcoin-cash', code: 'BCH' },
    { name: 'cardano', code: 'ADA' },
    { name: 'litecoin', code: 'LTC' },
    { name: 'nem', code: 'XEM' },
    { name: 'stellar', code: 'XLM' },
  ];
  constructor(private http: HttpClient) {}

  getCryptoPrices(): Observable<any> {
    return timer(0, 30000).pipe(
      switchMap(() =>
        this.http.get(this.apiUrl, {
          params: {
            ids: this.CRYPTOS.map(({ name }) => name).join(','),
            vs_currencies: 'usd',
          },
        })
      )
    );
  }

  getCryptoPricesForApi(): Observable<CryptoPrices> {
    return this.http.get<CryptoPrices>(this.apiUrl, {
      params: {
        ids: this.CRYPTOS.map(({ name }) => name).join(','),
        vs_currencies: 'usd',
      },
    });
  }

  private cachePrices(data: CryptoPrices) {
    localStorage.setItem('cryptoPrices', JSON.stringify(data));
  }

  private getCachePrices() {
    const cachedPrices = localStorage.getItem('cryptoPrices');
    if (cachedPrices) return JSON.parse(cachedPrices);
    return null;
  }
}
