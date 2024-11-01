import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  standalone: true,
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  imports: [CommonModule],
})
export class BalanceComponent {
  @Input() currency!: string;
  @Input() amount: number = 0;
  @Input() value!: number;
  @Input() usd!: number;
  @Input() balance!: number;
}
