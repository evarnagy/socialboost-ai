import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planner-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-actions.html',
  styleUrl: './planner-actions.css'
})
export class PlannerActions {
  @Input() loading = false;
  @Input() error = '';

  @Output() generate = new EventEmitter<void>();
}
