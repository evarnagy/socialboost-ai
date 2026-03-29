import { Component, Input } from '@angular/core';
import { PlanItem } from '../../../services/planner.service';

@Component({
  selector: 'app-planner-item',
  standalone: true,
  imports: [],
  templateUrl: './planner-item.html',
  styleUrl: './planner-item.css'
})
export class PlannerItem {
  @Input() item!: PlanItem;
}
