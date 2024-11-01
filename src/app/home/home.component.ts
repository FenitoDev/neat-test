import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CryptoPriceService } from '../crypto-price.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { TradeComponent } from '../trade/trade.component';
import { BalanceComponent } from '../balance/balance.component';
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { HeaderComponent } from '../header/header.component';
import { TransactionPageComponent } from '../transaction-page/transaction-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    TradeComponent,
    TradeComponent,
    BalanceComponent,
    HeaderComponent,
    TransactionPageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  prices: any = [];
  userData: any;
  netWorth: number = 0;
  transactions: any[] = [];

  constructor(private firestore: Firestore) {}
  authService = inject(AuthService);
  crypto = inject(CryptoPriceService);
  firebaseAuth = inject(Auth);

  ngOnInit(): void {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        this.authService.getData(user.uid).then((data) => {
          this.userData = { id: user.uid, ...data };
          this.getNetWorth();
        });
        const transactionsRef = collection(
          this.firestore,
          `users/${user.uid}/transactions`
        );
        const transactionsQuery = query(
          transactionsRef,
          orderBy('date', 'desc')
        );
        collectionData(transactionsRef, { idField: 'id' }).subscribe(
          (transactions: any[]) => {
            this.transactions = transactions.map((transaction) => {
              return {
                ...transaction,
                date: transaction.date.toDate(),
              };
            });
            this.transactions.sort((a, b) => b.date - a.date);
          }
        );
      }
    });
    this.crypto.getCryptoPrices().subscribe((prices) => {
      this.prices = prices;
    });
  }

  getNetWorth() {
    this.netWorth = this.userData.usd;
    for (const crypto of this.crypto.CRYPTOS) {
      const balance = this.userData[crypto.name] || 0;
      this.netWorth += balance * this.prices[crypto.name].usd;
    }
  }
}
