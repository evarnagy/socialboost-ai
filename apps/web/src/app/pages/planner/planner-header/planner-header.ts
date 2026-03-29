import { Component, Input } from '@angular/core';
import { PlannerHeaderData } from './planner-header-data';

@Component({
  selector: 'app-planner-header',
  standalone: true,
  imports: [],
  templateUrl: './planner-header.html',
  styleUrl: './planner-header.css'
})
export class PlannerHeader {
  @Input() data!: PlannerHeaderData;
}
