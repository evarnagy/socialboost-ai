import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProfileService,
  SocialPlatform,
  ContentGoal,
  BrandTone,
} from '../../services/profile.service';
import { OnboardingHeader } from './onboarding-header/onboarding-header';
import { ONBOARDING_HEADER } from './onboarding-header/onboarding-header-data';
import { OnboardingForm } from './onboarding-form/onboarding-form';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [OnboardingHeader, OnboardingForm],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})
export class Onboarding {
  industry = '';
  targetAudience = '';
  location = '';
  ageRange = '';
  preferredPlatform: SocialPlatform = 'instagram';
  contentGoal: ContentGoal = 'engagement';
  brandTone: BrandTone = 'friendly';
  loading = false;
  error = '';
  headerData = ONBOARDING_HEADER;

  constructor(private profile: ProfileService, private router: Router,  private cdr: ChangeDetectorRef) {}

    async ngOnInit() {
    const existing = await this.profile.getProfile();
    if (existing) {
      this.industry = existing.industry ?? '';
      this.targetAudience = existing.targetAudience ?? '';
      this.location = existing.location ?? '';
      this.ageRange = existing.ageRange ?? '';
      this.preferredPlatform = existing.preferredPlatform ?? 'instagram';
      this.contentGoal = existing.contentGoal ?? 'engagement';
      this.brandTone = existing.brandTone ?? 'friendly';
      this.cdr.detectChanges();
      // ha nem akarod, hogy újra lássa onboardingot:
      // await this.router.navigateByUrl('/ideas');
    }
  }
  
  async onSave() {
    this.error = '';
    this.loading = true;
    try {
      await this.profile.saveProfile({
        industry: this.industry.trim(),
        targetAudience: this.targetAudience.trim(),
        location: this.location.trim(),
        ageRange: this.ageRange.trim(),
        preferredPlatform: this.preferredPlatform,
        contentGoal: this.contentGoal,
        brandTone: this.brandTone,
      });
      await this.router.navigateByUrl('/ideas');
    } catch (e: any) {
      this.error = e?.message ?? 'Mentési hiba';
    } finally {
      this.loading = false;
    }
  }
}
