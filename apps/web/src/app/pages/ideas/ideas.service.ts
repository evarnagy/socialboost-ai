import { Injectable } from '@angular/core';
import { ContentGoal, SocialPlatform } from '../../services/profile.service';
import { environment } from '../../environment';
import { AuthService } from '../../services/auth.service';

export type Idea = { id: string; text: string };

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private apiBase = environment.apiBase;

  constructor(private authService: AuthService) {}

  async generate(
    industry: string,
    targetAudience: string,
    location: string,
    ageRange: string,
    platform: SocialPlatform,
    contentGoal: ContentGoal
  ): Promise<Idea[]> {
    const idToken = await this.authService.getIdToken();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${this.apiBase}/generate-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          industry,
          targetAudience,
          location,
          ageRange,
          platform,
          contentGoal,
          count: 3,
          language: 'hu',
        }),
        signal: controller.signal,
      });

      const raw = await res.text();

      if (!res.ok) throw new Error(`API error ${res.status}: ${raw}`);

      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error('Nem JSON választ kaptam a szervertől.');
      }

      if (!data?.ideas) throw new Error('A válaszban nincs "ideas" mező.');

      return data.ideas as Idea[];
    } finally {
      clearTimeout(timer);
    }
  }

  async generatePost(
    industry: string,
    targetAudience: string,
    location: string,
    ageRange: string,
    platform: SocialPlatform,
    contentGoal: ContentGoal,
    tone: 'friendly' | 'expert' | 'premium'
  ): Promise<StructuredPost> {
    const idToken = await this.authService.getIdToken();
    const res = await fetch(`${this.apiBase}/generate-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        industry,
        targetAudience,
        location,
        ageRange,
        platform,
        contentGoal,
        tone,
        language: 'hu',
      }),
    });

    const raw = await res.text();

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${raw}`);
    }

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error('Nem JSON választ kaptam a szervertől.');
    }

    if (!data?.post) {
      throw new Error('A válaszban nincs "post" mező.');
    }

    return data.post as StructuredPost;
  }
}
export type StructuredPost = {
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
};

