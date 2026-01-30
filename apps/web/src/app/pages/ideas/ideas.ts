import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { StructuredPost } from './ideas.service';


import { IdeasService, Idea } from './ideas.service';
import { ProfileService, BusinessProfile } from '../../services/profile.service';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideas.html',
  styleUrl: './ideas.css',
})
export class Ideas {
  // Profil állapot
  profileLoaded = false;
  hasProfile = false;

  //State változók
  post: StructuredPost | null = null;
  tone: 'friendly' | 'expert' | 'premium' = 'friendly';

  // Form mezők
  industry = '';
  targetAudience = '';

  // Ötletek
  ideas: Idea[] = [];
  loading = false;
  error = '';
  toast = '';

  constructor(
    private ideasService: IdeasService,
    private profileService: ProfileService,
    private router: Router,
    private favorites: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const profile = await this.profileService.getProfile();
      this.profileLoaded = true;

      if (!profile) {
        this.hasProfile = false;
        this.cdr.detectChanges();
        return;
      }

      this.hasProfile = true;
      this.industry = profile.industry ?? '';
      this.targetAudience = profile.targetAudience ?? '';
      this.cdr.detectChanges();
    } catch (e: any) {
      this.profileLoaded = true;
      this.hasProfile = false;
      this.error = e?.message ?? 'Nem sikerült betölteni a profilt.';
      this.cdr.detectChanges();
    }
  }

  goOnboarding() {
    this.router.navigateByUrl('/onboarding');
  }

  async onGenerate() {
    this.error = '';
    this.loading = true;
    this.cdr.detectChanges();

    try {
      this.ideas = await this.ideasService.generate(this.industry, this.targetAudience);
    } catch (e: any) {
      this.error = e?.message ?? 'Ismeretlen hiba';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
  
  async onGeneratePost() {
  this.error = '';
  this.loading = true;
  this.post = null;
  this.cdr.detectChanges();

  try {
    this.post = await this.ideasService.generatePost(
      this.industry,
      this.targetAudience,
      this.tone
    );
  } catch (e: any) {
    this.error = e?.message ?? 'Nem sikerült posztot generálni.';
  } finally {
    this.loading = false;
    this.cdr.detectChanges();
  }
}


  async saveFavorite(text: string) {
  this.toast = '';
  try {
    await this.favorites.addFavorite(text);
    this.toast = 'Eltárolva ✅';
  } catch (e: any) {
    this.toast = e?.message ?? 'Mentési hiba';
  } finally {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toast = '';
      this.cdr.detectChanges();
    }, 1500);
  }
}

}
