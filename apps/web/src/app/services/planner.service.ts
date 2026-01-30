import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';

export type PlanItem = {
  day: string;
  text: string;
};

@Injectable({ providedIn: 'root' })
export class PlannerService {
  constructor(private profile: ProfileService) {}

  async generateWeeklyPlan(): Promise<PlanItem[]> {
    const p = await this.profile.getProfile();
    if (!p) throw new Error('Nincs üzletprofil.');

    const days = ['Hétfő','Kedd','Szerda','Csütörtök','Péntek','Szombat','Vasárnap'];

    const templates = [
      `Bemutatkozó poszt: miért választottad a ${p.industry} területet? (${p.targetAudience})`,
      `Tippek/oktatás: 3 gyors tipp a témában (${p.industry})`,
      `Mítoszrombolás: 1 gyakori tévhit a ${p.industry} kapcsán`,
      `Before/after vagy eredmény poszt (ha releváns) – mit nyer a célközönséged?`,
      `Q&A: kérdezz-felelek – kérj 3 kérdést a követőktől`,
      `Ajánlás/értékelés: ügyfélvisszajelzés + rövid sztori`,
      `Call-to-action: foglalás / időpont / ajánlat – kinek szól? (${p.targetAudience})`,
    ];

    return days.map((d, i) => ({ day: d, text: templates[i] }));
  }
}
