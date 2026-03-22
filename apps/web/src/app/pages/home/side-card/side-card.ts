import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SideCardItem = {
  text: string;
};

@Component({
  selector: 'app-side-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-card.html',
  styleUrl: './side-card.css',
})
export class SideCard {
  @Input() title = '';
  @Input() items: SideCardItem[] = [];
}
