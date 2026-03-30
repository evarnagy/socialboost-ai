import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructuredPost } from '../ideas.service';
import { SocialPlatform } from '../../../services/profile.service';

type PlatformPreviewConfig = {
  label: string;
  captionLimit: number;
  hashtagHint: string;
  formatHint: string;
};

const PREVIEW_BY_PLATFORM: Record<SocialPlatform, PlatformPreviewConfig> = {
  instagram: {
    label: 'Instagram',
    captionLimit: 2200,
    hashtagHint: 'Ajánlott 5-10 hashtag, kulcsszavak + niche mix.',
    formatHint: 'Rövid hook az elején, emoji/sortörés jó olvashatósággal.',
  },
  twitter: {
    label: 'Twitter / X',
    captionLimit: 280,
    hashtagHint: 'Ajánlott 1-2 hashtag, rövid és lényegre törő stílus.',
    formatHint: 'Erős opening mondat, tömör mondatszerkezet.',
  },
  linkedin: {
    label: 'LinkedIn',
    captionLimit: 3000,
    hashtagHint: 'Ajánlott 3-5 szakmai hashtag.',
    formatHint: 'Szakmai kontextus + tanulság + egyértelmű CTA.',
  },
  facebook: {
    label: 'Facebook',
    captionLimit: 63206,
    hashtagHint: 'Ajánlott 1-3 hashtag, természetes nyelvezet.',
    formatHint: 'Storytelling jellegű szöveg, bekezdésekkel tagolva.',
  },
};

@Component({
  selector: 'app-post-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-result.html',
  styleUrl: './post-result.css',
})
export class PostResult {
  @Input() post: StructuredPost | null = null;
  @Input() platform: SocialPlatform = 'instagram';

  get preview(): PlatformPreviewConfig {
    return PREVIEW_BY_PLATFORM[this.platform] ?? PREVIEW_BY_PLATFORM.instagram;
  }

  get captionLength(): number {
    return (this.post?.caption ?? '').length;
  }

  get hookLength(): number {
    return (this.post?.hook ?? '').length;
  }

  get ctaLength(): number {
    return (this.post?.cta ?? '').length;
  }

  get totalHashtagLength(): number {
    return (this.post?.hashtags ?? []).join(' ').length;
  }

  isOverLimit(value: number, limit: number): boolean {
    return value > limit;
  }
}