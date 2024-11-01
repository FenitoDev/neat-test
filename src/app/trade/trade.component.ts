import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CryptoTransactionService } from '../crypto-exchange.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoPriceService, Cryptos } from '../crypto-price.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css',
})
export class TradeComponent {
  dialog = inject(MatDialog);
  @Input() userData: any;
  @Input() prices: any;

  constructor() {}

  openDialog() {
    console.log({ prices: this.prices });
    console.log({ userData: this.userData });
    this.dialog.open(Dialog, {
      data: {
        userData: this.userData,
        prices: this.prices,
      },
    });
  }
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  @Input() currency!: string;
  @Input() value!: number;
  @Input() balance!: number;
  @Input() usd!: number;

  crypto: Cryptos['name'] = 'bitcoin';
  amount: number = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  _snackBar = inject(MatSnackBar);

  cryptos = inject(CryptoPriceService);
  type: 'buy' | 'sell' = 'buy';
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  constructor(private transactionService: CryptoTransactionService) {}

  async onConfirm() {
    this.clearMessages();

    try {
      const response = await this.transactionService.processTransaction(
        this.data.userData.id,
        this.crypto,
        this.amount,
        this.type
      );

      if (response.statusCode === 200) {
        this.successMessage = response.message;
        console.log({ success: this.successMessage, data: this.data });
        this.showSuccess(this.successMessage);
        this.dialogRef.close();
      } else {
        this.errorMessage = response.message;
        console.log({ error: this.errorMessage });
        this.showError(this.errorMessage);
      }
    } catch (error) {
      this.errorMessage = 'Unexpected error';
    }
  }
  private clearMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }
  showSuccess(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showError(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
