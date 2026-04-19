export type ImageStyle = 'photorealistic' | 'illustration' | 'minimalist' | 'cinematic';

export const IMAGE_STYLE_OPTIONS: { value: ImageStyle; label: string }[] = [
  { value: 'photorealistic', label: 'Fotórealisztikus' },
  { value: 'illustration', label: 'Illusztráció' },
  { value: 'minimalist', label: 'Minimalista' },
  { value: 'cinematic', label: 'Filmszerű' },
];

export type ImageSize = '1024x1024' | '1024x1792' | '1792x1024';

export const IMAGE_SIZE_OPTIONS: { value: ImageSize; label: string }[] = [
  { value: '1024x1024', label: 'Négyzet (1:1)' },
  { value: '1792x1024', label: 'Fekvő (16:9)' },
  { value: '1024x1792', label: 'Álló (4:5)' },
];
