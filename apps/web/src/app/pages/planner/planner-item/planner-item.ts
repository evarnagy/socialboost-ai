import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanItem } from '../../../services/planner.service';

@Component({
  selector: 'app-planner-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-item.html',
  styleUrl: './planner-item.css'
})
export class PlannerItem {
  @Input() item!: PlanItem;
}
