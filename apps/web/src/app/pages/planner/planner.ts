import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerService, PlanItem } from '../../services/planner.service';
import { PlannerHeader } from './planner-header/planner-header';
import { PLANNER_HEADER } from './planner-header/planner-header-data';
import { PlannerActions } from './planner-actions/planner-actions';
import { PlannerList } from './planner-list/planner-list';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, PlannerHeader, PlannerActions, PlannerList],
  templateUrl: './planner.html',
  styleUrl: './planner.css'
})
export class Planner {
  loading = false;
  error = '';
  plan: PlanItem[] = [];
  headerData = PLANNER_HEADER;

  constructor(private planner: PlannerService, private cdr: ChangeDetectorRef) {}

  async onGenerate() {
    this.error = '';
    this.loading = true;
    this.cdr.detectChanges();

    try {
      this.plan = await this.planner.generateWeeklyPlan();
    } catch (e: any) {
      this.error = e?.message ?? 'Hiba a terv generálásakor.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
