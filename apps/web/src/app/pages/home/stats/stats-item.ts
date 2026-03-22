import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-item',
  standalone: true,
  templateUrl: './stats-item.html',
  styleUrl: './stats-item.css',
})
export class StatsItem {
  @Input() num = '';
  @Input() label = '';
}
