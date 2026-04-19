import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ImageGenService, GeneratedImage } from './image-gen.service';
import { ImageGenHeader } from './image-gen-header/image-gen-header';
import { ImageGenForm } from './image-gen-form/image-gen-form';
import { ImageResult } from './image-result/image-result';
import { IMAGE_GEN_HEADER } from './image-gen-header/image-gen-header-data';
import { ImageStyle, ImageSize } from './image-gen-form/image-gen-form-data';
import { ProfileService } from '../../services/profile.service';
import { GeneratedContentService } from '../../services/generated-content.service';
import { ProfileMissing } from '../ideas/profile-missing/profile-missing';
import { PROFILE_MISSING } from '../ideas/profile-missing/profile-missing-data';

@Component({
  selector: 'app-image-gen',
  standalone: true,
  imports: [CommonModule, ImageGenHeader, ImageGenForm, ImageResult, ProfileMissing],
  templateUrl: './image-gen.html',
  styleUrl: './image-gen.css',
})
export class ImageGen {
  headerData = IMAGE_GEN_HEADER;
  profileMissingData = PROFILE_MISSING;

  profileLoaded = false;
  hasProfile = false;

  industry = '';
  targetAudience = '';
  location = '';
  ageRange = '';

  style: ImageStyle = 'photorealistic';
  size: ImageSize = '1024x1024';

  loading = false;
  error = '';
  result: GeneratedImage | null = null;

  constructor(
    private imageGenService: ImageGenService,
    private profileService: ProfileService,
    private generatedContent: GeneratedContentService,
    private router: Router,
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

      const saved = await this.generatedContent.loadImage();
      if (saved?.imageUrl) {
        this.result = { imageUrl: saved.imageUrl };
      }
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
    this.result = null;
    this.cdr.detectChanges();

    try {
      this.result = await this.imageGenService.generateImage(
        this.industry,
        this.targetAudience,
        this.location,
        this.ageRange,
        this.style,
        this.size
      );
      if (this.result) {
        this.generatedContent.saveImage({ imageUrl: this.result.imageUrl });
      }
    } catch (e: any) {
      this.error = e?.message ?? 'Nem sikerült képet generálni.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
