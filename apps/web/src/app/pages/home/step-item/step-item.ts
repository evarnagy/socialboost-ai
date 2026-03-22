import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-item',
  standalone: true,
  templateUrl: './step-item.html',
  styleUrl: './step-item.css',
})
export class StepItem {
  @Input() number!: string;
  @Input() title!: string;
  @Input() description!: string;
}