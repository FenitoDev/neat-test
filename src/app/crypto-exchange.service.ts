import { inject, Injectable } from '@angular/core';
import { CryptoPriceService, Cryptos } from './crypto-price.service';
import { AuthService } from './auth.service';
import { doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CryptoTransactionService {
  firestore = inject(Firestore);
  constructor(
    private authService: AuthService,
    private cryptoPriceService: CryptoPriceService
  ) {}

  buyCrypto(userId: string, crypto: Cryptos['name'], amount: number) {
    return this.processTransaction(userId, crypto, amount, 'buy');
  }

  sellCrypto(userId: string, crypto: Cryptos['name'], amount: number) {
    return this.processTransaction(userId, crypto, amount, 'sell');
  }

  async processTransaction(
    userId: string,
    crypto: string,
    amount: number,
    type: 'buy' | 'sell'
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const userBalance = await this.authService.getData(userId);
      const cryptoPrices = await this.cryptoPriceService
        .getCryptoPricesForApi()
        .toPromise();
      if (!cryptoPrices)
        return { statusCode: 404, message: 'Cryptocurrency not found' };
      const cryptoPrice = cryptoPrices[crypto]?.usd;

      if (!cryptoPrice) {
        return { statusCode: 404, message: 'Cryptocurrency not found' };
      }

      const transactionCost = amount * cryptoPrice;

      if (type === 'buy') {
        if (userBalance['usd'] < transactionCost) {
          return { statusCode: 400, message: 'Insufficient USD balance' };
        }

        userBalance['usd'] -= transactionCost;
        userBalance[crypto] = (userBalance[crypto] || 0) + amount;
      } else if (type === 'sell') {
        if (userBalance[crypto] < amount) {
          return { statusCode: 400, message: `Insufficient ${crypto} balance` };
        }

        userBalance[crypto] -= amount;
        userBalance['usd'] += transactionCost;
      } else {
        return { statusCode: 400, message: 'Invalid transaction type' };
      }

      const reject = Math.random() < 0.1;
      if (reject) {
        return { statusCode: 503, message: 'Transaction rejected by exchange' };
      }

      const userRef = doc(this.firestore, `users/${userId}`);
      await updateDoc(userRef, {
        usd: userBalance['usd'],
        [crypto]: userBalance[crypto],
      });
      await this.authService.logTransaction(userId, {
        crypto,
        amount,
        price: transactionCost,
        type,
      });

      return { statusCode: 200, message: 'Transaction successful' };
    } catch (error) {
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }
}
