import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerService, PlanItem } from '../../services/planner.service';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner.html',
  styleUrl: './planner.css'
})
export class Planner {
  loading = false;
  error = '';
  plan: PlanItem[] = [];

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
