import { Component, Input } from '@angular/core';
import { OnboardingHeaderData } from './onboarding-header-data';

@Component({
  selector: 'app-onboarding-header',
  standalone: true,
  imports: [],
  templateUrl: './onboarding-header.html',
  styleUrl: './onboarding-header.css'
})
export class OnboardingHeader {
  @Input() data!: OnboardingHeaderData;
}
