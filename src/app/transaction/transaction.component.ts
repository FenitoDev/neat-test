import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  imports: [CommonModule],
})
export class TransactionCardComponent {
  @Input() type!: 'buy' | 'sell';
  @Input() amount: number = 0;
  @Input() price!: number;
  @Input() crypto!: string;
}
