import { Component, inject, Input, OnInit } from '@angular/core';
import { TransactionCardComponent } from '../transaction/transaction.component';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { HeaderComponent } from '../header/header.component';
import { BalanceComponent } from '../balance/balance.component';

@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [
    CommonModule,
    TransactionCardComponent,
    HeaderComponent,
    BalanceComponent,
  ],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css',
})
export class TransactionPageComponent {
  @Input() netWorth: number = 0;
  @Input() usd: number = 0;
  @Input() transactions: any[] = [];
}
