export type CtaButton = {
  text: string;
  type: 'primary' | 'ghost' | 'subtle';
  link?: string;
  isClick?: boolean;
};

export type CtaRowData = CtaButton[];

export const HOME_HERO_CTAS: CtaRowData = [
  { text: 'Kezdjük →', type: 'primary', isClick: true },
  { text: 'Megnézem az ötleteket', type: 'ghost', link: '/ideas' },
  { text: 'Heti tervező', type: 'subtle', link: '/planner' },
];

export const HOME_BOTTOM_CTAS: CtaRowData = [
  { text: 'Kezdjük el', type: 'primary', isClick: true },
];