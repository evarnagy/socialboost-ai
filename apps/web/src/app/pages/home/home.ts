import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FeatureCard } from './feature-cards/feature-card';
import { StatsItem } from './stats/stats-item';
import { TrustItem } from './trust/trust-item';
import { StepItem } from './step-item/step-item';
import { HOME_STATS } from './stats/stats-data';
import { HOME_TRUST } from './trust/trust-data';
import { HOME_STEPS } from './steps-data';
import { MockPost } from './mock-post/mock-post';
import { SideCard } from './side-card/side-card';
import { HOME_MOCK_POST } from './mock-post-data';
import { HOME_SIDE_CARD_ITEMS } from './side-card-data';
import { HOME_FEATURES } from './home-features-data';
import { Footer } from './footer/footer';
import { HowHeader } from './how-header/how-header';
import { CtaRow } from './cta-row/cta-row';
import { HOME_FOOTER } from './footer/footer-data';
import { HOME_HOW_HEADER } from './how-header/how-header-data';
import { HOME_HERO_CTAS, HOME_BOTTOM_CTAS } from './cta-row/cta-row-data';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FeatureCard, StatsItem, TrustItem, StepItem, MockPost, SideCard, Footer, HowHeader, CtaRow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = HOME_FEATURES;
  stats = HOME_STATS;
  trust = HOME_TRUST;
  steps = HOME_STEPS;
  mockPost = HOME_MOCK_POST;
  sideCardItems = HOME_SIDE_CARD_ITEMS;
  footer = HOME_FOOTER;
  howHeader = HOME_HOW_HEADER;
  heroCtas = HOME_HERO_CTAS;
  bottomCtas = HOME_BOTTOM_CTAS;

  constructor(private auth: AuthService, private router: Router) {}

  start() {
    if (this.auth.user) {
    } else {
      this.router.navigate(['/login']);
    }
  }
}
