import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trust-item',
  standalone: true,
  templateUrl: './trust-item.html',
  styleUrl: './trust-item.css',
})
export class TrustItem {
  @Input() icon = '';
  @Input() label = '';
}
