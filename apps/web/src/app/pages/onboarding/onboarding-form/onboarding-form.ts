import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialPlatform, ContentGoal, BrandTone } from '../../../services/profile.service';

@Component({
  selector: 'app-onboarding-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding-form.html',
  styleUrl: './onboarding-form.css'
})
export class OnboardingForm {
  @Input() industry = '';
  @Input() targetAudience = '';
  @Input() location = '';
  @Input() ageRange = '';
  @Input() preferredPlatform: SocialPlatform = 'instagram';
  @Input() contentGoal: ContentGoal = 'engagement';
  @Input() brandTone: BrandTone = 'friendly';
  @Input() loading = false;
  @Input() error = '';

  @Output() industryChange = new EventEmitter<string>();
  @Output() audienceChange = new EventEmitter<string>();
  @Output() locationChange = new EventEmitter<string>();
  @Output() ageRangeChange = new EventEmitter<string>();
  @Output() platformChange = new EventEmitter<SocialPlatform>();
  @Output() goalChange = new EventEmitter<ContentGoal>();
  @Output() brandToneChange = new EventEmitter<BrandTone>();
  @Output() save = new EventEmitter<void>();

  currentStep = 1;
  readonly totalSteps = 3;

  readonly platformOptions: Array<{ value: SocialPlatform; label: string }> = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
  ];

  readonly goalOptions: Array<{ value: ContentGoal; label: string }> = [
    { value: 'engagement', label: 'Elköteleződés növelése' },
    { value: 'lead', label: 'Érdeklődők gyűjtése' },
    { value: 'sales', label: 'Értékesítés ösztönzése' },
    { value: 'awareness', label: 'Márkaismerettség növelése' },
  ];

  readonly toneOptions: Array<{ value: BrandTone; label: string }> = [
    { value: 'friendly', label: 'Barátságos' },
    { value: 'expert', label: 'Szakértői' },
    { value: 'premium', label: 'Prémium' },
  ];

  goNext() {
    if (!this.canMoveToNextStep()) {
      return;
    }
    this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
  }

  goBack() {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }

  canMoveToNextStep(): boolean {
    if (this.currentStep === 1) {
      return (
        this.industry.trim() !== '' &&
        this.targetAudience.trim() !== '' &&
        this.location.trim() !== '' &&
        this.ageRange.trim() !== ''
      );
    }
    if (this.currentStep === 2) {
      return !!this.preferredPlatform;
    }
    return true;
  }

  isFormValid(): boolean {
    return (
      this.industry.trim() !== '' &&
      this.targetAudience.trim() !== '' &&
      this.location.trim() !== '' &&
      this.ageRange.trim() !== '' &&
      !!this.preferredPlatform &&
      !!this.contentGoal &&
      !!this.brandTone
    );
  }

  onSubmit() {
    if (!this.isFormValid() || this.loading) {
      return;
    }
    this.save.emit();
  }
}
