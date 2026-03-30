import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import OpenAI from "openai";

dotenv.config();

// --- Schemas ---

const GenerateSchema = z.object({
  industry: z.string().min(2),
  targetAudience: z.string().min(2),
  count: z.number().int().min(3).max(10).default(3),
  language: z.enum(["hu", "en"]).default("hu"),
});

const GeneratePostSchema = z.object({
  industry: z.string().min(2),
  targetAudience: z.string().min(2),
  tone: z.enum(["friendly", "expert", "premium"]).default("friendly"),
  language: z.enum(["hu", "en"]).default("hu"),
});

const WeeklyPlanSchema = z.object({
  industry: z.string().min(2),
  targetAudience: z.string().min(2),
  location: z.string().optional().default(""),
  ageRange: z.string().optional().default(""),
  platform: z.enum(["instagram", "twitter", "linkedin", "facebook"]).optional().default("instagram"),
  contentGoal: z.enum(["engagement", "lead", "sales", "awareness"]).optional().default("engagement"),
  tone: z.enum(["friendly", "expert", "premium"]).optional().default("friendly"),
  language: z.enum(["hu", "en"]).optional().default("hu"),
});

// --- App setup ---

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Helpers ---

function stripCodeFence(raw: string): string {
  return raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function extractJsonObject(raw: string): string {
  const s = stripCodeFence(raw);
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  return start !== -1 && end > start ? s.slice(start, end + 1) : s;
}

function extractJsonArray(raw: string): string {
  const s = stripCodeFence(raw);
  const start = s.indexOf("[");
  const end = s.lastIndexOf("]");
  if (start !== -1 && end > start) return s.slice(start, end + 1);
  const os = s.indexOf("{");
  const oe = s.lastIndexOf("}");
  return os !== -1 && oe > os ? s.slice(os, oe + 1) : s;
}

function parseWeeklyPlanLoose(raw: string): any[] {
  const cleaned = stripCodeFence(raw);
  const candidate = extractJsonArray(cleaned);

  try {
    const parsed = JSON.parse(candidate);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.plan)) return parsed.plan;
  } catch {
    // Try to salvage complete object blocks if JSON is truncated.
  }

  const objectBlocks = cleaned.match(/\{[\s\S]*?\}(?=\s*,|\s*\])/g) ?? [];
  const recovered: any[] = [];

  for (const block of objectBlocks) {
    try {
      const item = JSON.parse(block);
      if (item && typeof item === "object") recovered.push(item);
    } catch {
      // ignore malformed blocks
    }
  }

  return recovered;
}

const DAYS_HU = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];

function mockWeeklyPlan(
  industry: string,
  targetAudience: string
): Array<{ day: string; topic: string; hook: string; caption: string; cta: string; hashtags: string[] }> {
  const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
  const ind = industry.toLowerCase().replace(/\s/g, "_");
  const templates = [
    {
      topic: "Bemutatkozás",
      hook: `Mit jelent valójában a ${industry} a hétköznapokban?`,
      caption: `A legtöbben csak a végeredményt látják, pedig a folyamat legalább ilyen fontos. Megmutatom, hogyan segítek a ${targetAudience} közönségnek érthetően és emberközelien.`,
      cta: "Kövess, ha érdekelnek a gyakorlati tippek.",
      hashtags: ["#bemutatkozas", "#vallalkozas", `#${ind}`],
    },
    {
      topic: "Hasznos tipp",
      hook: `3 rövid tipp, amit ma is be tudsz építeni`,
      caption: `Összegyűjtöttem három egyszerű, mégis hatékony ötletet a ${industry} témájában. Nem bonyolult, viszont látványosan javít a végeredményen.`,
      cta: "Mentsd el, hogy később is meglegyen.",
      hashtags: ["#tippek", "#oktatás", `#${ind}`],
    },
    {
      topic: "Mítoszrombolás",
      hook: `Ezt a tévhitet ideje elengedni a ${industry} kapcsán`,
      caption: `Sokan azt hiszik, hogy a jó megoldás mindig drága vagy bonyolult. A valóságban a jól felépített, egyszerű lépések működnek igazán.`,
      cta: "Írd meg kommentben, te mit hallottál erről.",
      hashtags: ["#mitoszrombolas", "#igazsag", `#${ind}`],
    },
    {
      topic: "Eredménytörténet",
      hook: `Így lett kézzelfogható eredmény néhány lépésből`,
      caption: `Egy valós példa arra, hogyan jutottunk el az első ötlettől a mérhető eredményig. A ${targetAudience} célcsoportnál ez a megközelítés kifejezetten jól működött.`,
      cta: "Ha ilyet szeretnél, írj üzenetet.",
      hashtags: ["#eredmeny", "#siker", "#esettanulmany"],
    },
    {
      topic: "Kérdezz-felelek",
      hook: "Ma a ti kérdéseitekre válaszolok",
      caption: `Jöhet minden, ami ${industry} témában bizonytalan vagy félreérthető. Röviden és érthetően válaszolok, hogy könnyebb legyen dönteni.`,
      cta: "Tedd fel a kérdésed kommentben.",
      hashtags: ["#kerdezzfelelek", "#qa", "#kozosseg"],
    },
    {
      topic: "Ügyfélvélemény",
      hook: "Ezt mondta egy ügyfelem a közös munkáról",
      caption: `A legjobb visszajelzés mindig az, amikor valaki nyugodtabban, magabiztosabban távozik. Nekem ez jelenti az igazi értéket a ${industry} területén.`,
      cta: "Nézd meg a többi visszajelzést is.",
      hashtags: ["#ugyfelvelemeny", "#bizalom", "#ajanlas"],
    },
    {
      topic: "Ajánlat",
      hook: "Ha halogattad, most érdemes lépni",
      caption: `Ha a ${targetAudience} célcsoportot szeretnéd megszólítani vagy jobb eredményeket szeretnél, most ideális időzítésben vagy.`,
      cta: "Írj üzenetet, és nézzük meg együtt a következő lépést.",
      hashtags: ["#ajanlat", "#idopont", "#most"],
    },
  ];
  return days.map((day, i) => ({ day, ...templates[i]! }));
}

// --- Routes ---

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "socialboost-api" });
});

app.post("/generate-ideas", async (req, res) => {
  const parsed = GenerateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_INPUT", details: parsed.error.flatten() });
  }

  const { industry, targetAudience, count, language } = parsed.data;

  const buildFallback = () =>
    Array.from({ length: count }, (_, i) => ({
      id: String(i + 1),
      text: language === "hu"
        ? `Posztotlet #${i + 1}: ${industry} - ${targetAudience}`
        : `Idea #${i + 1}: ${industry} - ${targetAudience}`,
    }));

  const useAi = process.env.USE_AI === "true" && !!process.env.OPENAI_API_KEY;
  if (!useAi) {
    return res.json({ ideas: buildFallback(), source: "mock" });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const instructions = language === "hu"
      ? "Te egy marketing asszisztens vagy magyar kisvallalkozoknak. Rovid, posztolhato otleteket adj."
      : "You are a marketing assistant. Provide short, post-ready ideas.";
    const input = language === "hu"
      ? `Uzletag: ${industry}\nCelkozonseg: ${targetAudience}\n\nAdj ${count} db posztotletet. Valasz formatum: csak tiszta JSON:\n{"ideas":[{"text":"..."}]}\nNincs extra szoveg.`
      : `Industry: ${industry}\nTarget audience: ${targetAudience}\n\nGive ${count} post ideas. Response: ONLY JSON:\n{"ideas":[{"text":"..."}]}\nNo extra text.`;

    const resp = await openai.responses.create({ model, instructions, input, max_output_tokens: 300, temperature: 0.8 });
    const raw = resp.output_text?.trim() || "";

    let json: any;
    try { json = JSON.parse(raw); } catch { return res.json({ ideas: buildFallback(), source: "fallback" }); }

    const ideasArr = Array.isArray(json?.ideas) ? json.ideas : [];
    const ideas = ideasArr
      .slice(0, count)
      .map((x: any, i: number) => ({ id: String(i + 1), text: String(x?.text ?? "").trim() }))
      .filter((x: any) => x.text.length > 0);

    if (ideas.length < 3) return res.json({ ideas: buildFallback(), source: "fallback" });
    return res.json({ ideas, source: "openai", model });
  } catch (err: any) {
    console.error("GENERATE_IDEAS_ERROR:", err?.message ?? err);
    return res.json({ ideas: [], source: "fallback_connection" });
  }
});

app.post("/generate-post", async (req, res) => {
  const parsed = GeneratePostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_INPUT" });
  }

  const { industry, targetAudience, tone, language } = parsed.data;

  const mockPost = {
    hook: language === "hu" ? "Szeretel magabiztosabban ragyogni?" : "Want to stand out more confidently?",
    caption: language === "hu"
      ? `A megfelelo ${industry} megoldas nemcsak szep�t, hanem onbizalmat is ad. Igy hozhatod ki a legtobbet belole.`
      : `The right ${industry} approach improves results and confidence for ${targetAudience}.`,
    cta: language === "hu" ? "Irj uzenetet idopontert!" : "Send a message to get started!",
    hashtags: language === "hu" ? ["#vallalkozas", "#socialmedia", "#onbizalom"] : ["#business", "#socialmedia", "#content"],
  };

  const useAi = process.env.USE_AI === "true" && !!process.env.OPENAI_API_KEY;
  if (!useAi) return res.json({ source: "mock", post: mockPost });

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const toneMap: Record<string, string> = { friendly: "baratsagos, kozvetlen", expert: "szakertoi, magabiztos", premium: "exkluziv, premium" };

    const prompt = language === "hu"
      ? `Keszits 1 kozossegi media posztot:\nUzletag: ${industry}\nCelkozonseg: ${targetAudience}\nHangnem: ${toneMap[tone]}\n\nValasz CSAK JSON:\n{"hook":"...","caption":"...","cta":"...","hashtags":["#..."]}`
      : `Create 1 social media post:\nIndustry: ${industry}\nAudience: ${targetAudience}\nTone: ${tone}\n\nResponse ONLY JSON:\n{"hook":"...","caption":"...","cta":"...","hashtags":["#..."]}`;

    const resp = await openai.responses.create({ model, input: prompt, max_output_tokens: 300, temperature: 0.7 });
    const raw = extractJsonObject(resp.output_text?.trim() ?? "");

    let post: any;
    try { post = JSON.parse(raw); } catch {
      console.error("GENERATE_POST_BAD_JSON:", resp.output_text?.slice(0, 200));
      return res.status(502).json({ error: "AI_BAD_JSON" });
    }

    if (!post?.hook || !post?.caption || !post?.cta || !Array.isArray(post?.hashtags)) {
      return res.status(502).json({ error: "AI_BAD_SHAPE" });
    }

    return res.json({ source: "openai", post, model });
  } catch (e: any) {
    console.error("GENERATE_POST_ERROR:", e?.message);
    return res.json({ source: "fallback_connection", post: mockPost });
  }
});

app.post("/generate-weekly-plan", async (req, res) => {
  const parsed = WeeklyPlanSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_INPUT", details: parsed.error.flatten() });
  }

  const { industry, targetAudience, location, ageRange, platform, contentGoal, tone, language } = parsed.data;

  const fallback = mockWeeklyPlan(industry, targetAudience);

  const useAi = process.env.USE_AI === "true" && !!process.env.OPENAI_API_KEY;
  if (!useAi) return res.json({ plan: fallback, source: "mock" });

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const toneMap: Record<string, string> = { friendly: "barátságos, közvetlen", expert: "szakértői, magabiztos", premium: "exkluzív, prémium" };
    const platformMap: Record<string, string> = { instagram: "Instagram", twitter: "X (Twitter)", linkedin: "LinkedIn", facebook: "Facebook" };
    const goalMap: Record<string, string> = { engagement: "elköteleződés növelése", lead: "érdeklődők szerzése", sales: "értékesítés", awareness: "ismertség építése" };

    const prompt = `
Te egy senior magyar social media szövegíró vagy.

Feladat: készíts 7 napos poszttervet természetes, élő, emberi magyar nyelven.
Kulcskövetelmény: minden szöveg legyen teljesen ékezetes magyar, ne használj "ékezet nélküli" írást.

Adatok:
- Üzletág: ${industry}
- Célközönség: ${targetAudience}
${location ? `- Hely: ${location}\n` : ""}${ageRange ? `- Korosztály: ${ageRange}\n` : ""}- Platform: ${platformMap[platform]}
- Tartalom célja: ${goalMap[contentGoal]}
- Hangnem: ${toneMap[tone]}

Stílus:
- Kerüld a sablonos, robotikus mondatokat.
- Írj konkrétan, röviden, természetes ritmussal.
- A hook legyen erős, de ne clickbait.
- A caption legfeljebb 2 rövid mondat.
- A CTA legyen cselekvésre ösztönző, de ne agresszív.
- Törekedj tömör megfogalmazásra, naponként max. ~280 karakter összesen.

Napok sorrendben:
Hétfő, Kedd, Szerda, Csütörtök, Péntek, Szombat, Vasárnap

Válasz kizárólag JSON tömb legyen, pontosan 7 elemmel, ebben a formában:
[
  {
    "day": "Hétfő",
    "topic": "Rövid téma",
    "hook": "Figyelemfelkeltő mondat",
    "caption": "2-3 mondat",
    "cta": "Rövid CTA",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
  }
]

Ne írj magyarázatot, csak a JSON-t.`.trim();

    const compactPrompt = `
Készíts 7 napos, teljesen ékezetes magyar poszttervet. Röviden írj, ne legyen sablonos.

Adatok:
- Üzletág: ${industry}
- Célközönség: ${targetAudience}
- Platform: ${platformMap[platform]}
- Cél: ${goalMap[contentGoal]}
- Hangnem: ${toneMap[tone]}

Kimenet: CSAK JSON tömb, 7 elem, napok sorrendben Hétfő-Vasárnap.
Minden elem:
{"day":"Hétfő","topic":"max 4 szó","hook":"max 10 szó","caption":"max 2 mondat","cta":"max 8 szó","hashtags":["#...","#...","#..."]}
`.trim();

    const resp = await Promise.race([
      openai.responses.create({ model, input: prompt, max_output_tokens: 1200, temperature: 0.85 }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("OPENAI_TIMEOUT")), 35000);
      }),
    ]);
    let parsedPlan = parseWeeklyPlanLoose(resp.output_text?.trim() ?? "");

    if (parsedPlan.length < 7) {
      const retryResp = await Promise.race([
        openai.responses.create({ model, input: compactPrompt, max_output_tokens: 900, temperature: 0.7 }),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("OPENAI_TIMEOUT_RETRY")), 25000);
        }),
      ]);
      parsedPlan = parseWeeklyPlanLoose(retryResp.output_text?.trim() ?? "");
    }

    if (parsedPlan.length < 7) {
      console.error("WEEKLY_PLAN_BAD_JSON_OR_SHORT:", (resp.output_text ?? "").slice(0, 220));
      return res.json({ plan: fallback, source: "fallback_short" });
    }

    const plan = DAYS_HU.map((day, i) => {
      const item = parsedPlan[i] ?? {};
      return {
        day,
        topic: String(item.topic ?? "").trim() || fallback[i]!.topic,
        hook: String(item.hook ?? "").trim() || fallback[i]!.hook,
        caption: String(item.caption ?? "").trim() || fallback[i]!.caption,
        cta: String(item.cta ?? "").trim() || fallback[i]!.cta,
        hashtags: Array.isArray(item.hashtags) ? item.hashtags.map(String) : fallback[i]!.hashtags,
      };
    });

    return res.json({ plan, source: "openai", model });
  } catch (e: any) {
    console.error("WEEKLY_PLAN_ERROR:", e?.message);
    return res.json({ plan: fallback, source: "fallback_connection" });
  }
});

// --- Start ---

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
