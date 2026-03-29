export type ToneType = 'friendly' | 'expert' | 'premium';

export type IdeaFormData = {
  industry: string;
  targetAudience: string;
  tone: ToneType;
};

export const TONE_OPTIONS = [
  { value: 'friendly' as ToneType, label: 'Barátságos' },
  { value: 'expert' as ToneType, label: 'Szakértői' },
  { value: 'premium' as ToneType, label: 'Prémium' },
];