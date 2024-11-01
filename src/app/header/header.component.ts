import { Component, inject, Input } from '@angular/core';
import { TradeComponent } from '../trade/trade.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TradeComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() prices: any = [];
  @Input() userData: any;

  authService = inject(AuthService);
  constructor(private router: Router) {}

  goToTransactions() {
    this.router.navigate(['/transactions']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }
}
