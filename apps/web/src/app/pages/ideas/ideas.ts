import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { StructuredPost, IdeasService, Idea } from './ideas.service';
import { ProfileService, SocialPlatform, ContentGoal } from '../../services/profile.service';
import { GeneratedContentService } from '../../services/generated-content.service';
import { IdeasHeader } from './ideas-header/ideas-header';
import { ProfileMissing } from './profile-missing/profile-missing';
import { IdeaForm } from './idea-form/idea-form';
import { PostResult } from './post-result/post-result';
import { IDEAS_HEADER } from './ideas-header/ideas-header-data';
import { PROFILE_MISSING } from './profile-missing/profile-missing-data';
import { ToneType } from './idea-form/idea-form-data';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [CommonModule, FormsModule, IdeasHeader, ProfileMissing, IdeaForm, PostResult],
  templateUrl: './ideas.html',
  styleUrl: './ideas.css',
})
export class Ideas {

  // Profil állapot
  profileLoaded = false;
  hasProfile = false;

  // Data
  ideasHeaderData = IDEAS_HEADER;
  profileMissingData = PROFILE_MISSING;

  //State változók
  post: StructuredPost | null = null;
  tone: ToneType = 'friendly';

  // Form mezők
  industry = '';
  targetAudience = '';
  location = '';
  ageRange = '';
  preferredPlatform: SocialPlatform = 'instagram';
  contentGoal: ContentGoal = 'engagement';

  // Ötletek
  ideas: Idea[] = [];
  loading = false;
  error = '';
  toast = '';

  constructor(
    private ideasService: IdeasService,
    private profileService: ProfileService,
    private generatedContent: GeneratedContentService,
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
      this.location = profile.location ?? '';
      this.ageRange = profile.ageRange ?? '';
      this.preferredPlatform = profile.preferredPlatform ?? 'instagram';
      this.contentGoal = profile.contentGoal ?? 'engagement';
      this.tone = profile.brandTone ?? 'friendly';
      const saved = await this.generatedContent.loadIdeas();
      if (saved) {
        this.ideas = saved.ideas ?? [];
        this.post = saved.post ?? null;
      }
      this.profileLoaded = true;
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
      this.ideas = await this.ideasService.generate(
        this.industry,
        this.targetAudience,
        this.location,
        this.ageRange,
        this.preferredPlatform,
        this.contentGoal
      );
      this.generatedContent.saveIdeas({ ideas: this.ideas, post: this.post });
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
      this.location,
      this.ageRange,
      this.preferredPlatform,
      this.contentGoal,
      this.tone
    );
    this.generatedContent.saveIdeas({ ideas: this.ideas, post: this.post });
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

