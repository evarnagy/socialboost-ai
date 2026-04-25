import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { environment } from '../environment';

export type PlanItem = {
  day: string;
  topic: string;
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
};

@Injectable({ providedIn: 'root' })
export class PlannerService {
  private apiBase = environment.apiBase;
  private days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

  constructor(private profile: ProfileService) {}

  private buildFallbackPlan(industry: string, targetAudience: string): PlanItem[] {
    const industryTag = industry.toLowerCase().replace(/\s+/g, '_');
    const templates = [
      {
        topic: 'Bemutatkozás',
        hook: `Mit csinál egy ${industry} szakember valójában?`,
        caption: `Sokan csak a végeredményt látják, pedig a háttérmunka legalább ilyen fontos. Megmutatom, hogyan segítek a ${targetAudience} közönségnek a ${industry} területén.`,
        cta: 'Kövess további tippekért!',
        hashtags: ['#bemutatkozas', '#vallalkozas', `#${industryTag}`],
      },
      {
        topic: 'Tipp',
        hook: `3 gyors tipp ${targetAudience} számára`,
        caption: `Hoztam három egyszerű, mégis működő tippet a ${industry} témában. Olyanokat, amiket már ma kipróbálhatsz.`,
        cta: 'Mentsd el ezt a posztot!',
        hashtags: ['#tippek', '#oktatás', `#${industryTag}`],
      },
      {
        topic: 'Mítoszrombolás',
        hook: `Gyakori tévhit a ${industry} kapcsán`,
        caption: `Sokan rossz információk alapján döntenek ebben a témában. Röviden megmutatom, mi igaz, és mi az, amit érdemes elengedni.`,
        cta: 'Írd meg kommentben, te mit hittél!',
        hashtags: ['#mitoszrombolas', '#igazsag', `#${industryTag}`],
      },
      {
        topic: 'Eredmény',
        hook: `Előtte-utána történet`,
        caption: `Egy valódi példa arról, hogyan jutottunk el az első ötlettől a kézzelfogható eredményig. A jó stratégia itt tényleg sokat számít.`,
        cta: 'Foglalj időpontot még ma!',
        hashtags: ['#eredmeny', '#transzformacio', '#siker'],
      },
      {
        topic: 'Q&A',
        hook: 'Kérdezz-felelek nap',
        caption: `Írd le bátran, mi bizonytalan számodra a ${industry} témában, és érthetően válaszolok rá. Nincs rossz kérdés.`,
        cta: 'Tedd fel a kérdésed kommentben!',
        hashtags: ['#qa', '#kerdezz', '#kozosseg'],
      },
      {
        topic: 'Ügyfélvélemény',
        hook: 'Mit mondanak az ügyfelek?',
        caption: `Egy rövid történet arról, milyen élmény volt végigmenni a folyamaton. A visszajelzésekből mindig rengeteget tanulok.`,
        cta: 'Nézd meg a többi eredményt is!',
        hashtags: ['#ugyfelvelemeny', '#bizalom', '#ajanlas'],
      },
      {
        topic: 'Ajánlat',
        hook: 'Itt az idő elkezdeni',
        caption: `Ha a ${targetAudience} célcsoportot szeretnéd elérni és nem csak ötletelni, most érdemes belevágni. Egy jó első lépés sokat számít.`,
        cta: 'Írj üzenetet és egyeztessünk!',
        hashtags: ['#cta', '#ajanlat', '#idopont'],
      },
    ];

    return this.days.map((day, i) => ({ day, ...templates[i] }));
  }

  async generateWeeklyPlan(): Promise<PlanItem[]> {
    const p = await this.profile.getProfile();
    if (!p) throw new Error('Nincs üzletprofil.');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch(`${this.apiBase}/generate-weekly-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: p.industry,
          targetAudience: p.targetAudience,
          location: p.location ?? '',
          ageRange: p.ageRange ?? '',
          platform: p.preferredPlatform ?? 'instagram',
          contentGoal: p.contentGoal ?? 'engagement',
          tone: p.brandTone ?? 'friendly',
          language: 'hu',
        }),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!res.ok) {
        return this.buildFallbackPlan(p.industry, p.targetAudience);
      }

      const data = await res.json();

      if (!Array.isArray(data?.plan) || data.plan.length === 0) {
        return this.buildFallbackPlan(p.industry, p.targetAudience);
      }

      return data.plan as PlanItem[];
    } catch (e: any) {
      clearTimeout(timer);
      if (e?.name === 'AbortError') {
        return this.buildFallbackPlan(p.industry, p.targetAudience);
      }
      return this.buildFallbackPlan(p.industry, p.targetAudience);
    }
  }
}
