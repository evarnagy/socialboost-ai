import { Injectable } from '@angular/core';
import { ImageStyle, ImageSize } from './image-gen-form/image-gen-form-data';

export type GeneratedImage = {
  imageUrl: string;
};

@Injectable({ providedIn: 'root' })
export class ImageGenService {
  private apiBase = 'http://localhost:8080';

  async generateImage(
    industry: string,
    targetAudience: string,
    location: string,
    ageRange: string,
    style: ImageStyle,
    size: ImageSize
  ): Promise<GeneratedImage> {
    const res = await fetch(`${this.apiBase}/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ industry, targetAudience, location, ageRange, style, size }),
    });

    const raw = await res.text();

    if (!res.ok) {
      throw new Error(`API hiba ${res.status}: ${raw}`);
    }

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error('Érvénytelen választ kaptam a szervertől.');
    }

    if (!data?.imageUrl) {
      throw new Error('A válaszban nincs "imageUrl" mező.');
    }

    return { imageUrl: data.imageUrl as string };
  }
}
