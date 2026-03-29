import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  @Input() loading = false;
  @Input() error = '';

  @Output() industryChange = new EventEmitter<string>();
  @Output() audienceChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<void>();
}
