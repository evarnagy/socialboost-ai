export type StepData = {
  number: string;
  title: string;
  description: string;
};

export const HOME_STEPS: StepData[] = [
  { number: '1', title: 'Belépsz', description: 'Email + jelszó (Firebase Auth).' },
  { number: '2', title: 'Megadod az üzletprofilt', description: 'Üzletág + célközönség, egyszer kell kitölteni.' },
  { number: '3', title: 'Generálsz ötleteket és posztot', description: 'Ötletek listában + "Konkrét poszt" strukturált kimenettel.' },
];
