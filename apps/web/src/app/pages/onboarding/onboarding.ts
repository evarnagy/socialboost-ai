import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})
export class Onboarding {
  industry = '';
  targetAudience = '';
  loading = false;
  error = '';

  constructor(private profile: ProfileService, private router: Router,  private cdr: ChangeDetectorRef) {}

    async ngOnInit() {
    const existing = await this.profile.getProfile();
    if (existing) {
      this.industry = existing.industry ?? '';
      this.targetAudience = existing.targetAudience ?? '';
      this.cdr.detectChanges();
      // ha nem akarod, hogy újra lássa onboardingot:
      // await this.router.navigateByUrl('/ideas');
    }
  }
  
  async onSave() {
    this.error = '';
    this.loading = true;
    try {
      await this.profile.saveProfile(this.industry.trim(), this.targetAudience.trim());
      await this.router.navigateByUrl('/ideas');
    } catch (e: any) {
      this.error = e?.message ?? 'Mentési hiba';
    } finally {
      this.loading = false;
    }
  }
}
