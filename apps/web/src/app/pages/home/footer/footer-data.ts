export type FooterData = {
  copyright: string;
  links: { text: string; route: string }[];
};

export const HOME_FOOTER: FooterData = {
  copyright: '© SocialBoost AI — szakdolgozati prototípus',
  links: [
    { text: 'Ötletek', route: '/ideas' },
    { text: 'Könyvtár', route: '/library' },
    { text: 'Tervező', route: '/planner' },
  ],
};