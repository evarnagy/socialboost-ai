import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerItem } from '../planner-item/planner-item';
import { PlanItem } from '../../../services/planner.service';

@Component({
  selector: 'app-planner-list',
  standalone: true,
  imports: [CommonModule, PlannerItem],
  templateUrl: './planner-list.html',
  styleUrl: './planner-list.css'
})
export class PlannerList {
  @Input() plan: PlanItem[] = [];
}
