import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: string = '';
  @Input() amount: string = '';
}
