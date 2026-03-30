import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import OpenAI from "openai";


dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GeneratePostSchema = z.object({
  industry: z.string().min(2),
  targetAudience: z.string().min(2),
  tone: z.enum(['friendly', 'expert', 'premium']).default('friendly'),
  language: z.enum(['hu', 'en']).default('hu'),
});

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "socialboost-api" });
});

const GenerateSchema = z.object({
  industry: z.string().min(2),
  targetAudience: z.string().min(2),
  count: z.number().int().min(3).max(10).default(3),
  language: z.enum(["hu", "en"]).default("hu"),
});

app.post("/generate-ideas", async (req, res) => {
  const parsed = GenerateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_INPUT", details: parsed.error.flatten() });
  }

  const { industry, targetAudience, count, language } = parsed.data;

  const buildIdeasFallback = (suffixHu: string, suffixEn: string) =>
    Array.from({ length: count }, (_, i) => ({
      id: String(i + 1),
      text:
        language === "hu"
          ? `Posztötlet #${i + 1}: ${industry} – ${targetAudience} (${suffixHu})`
          : `Idea #${i + 1}: ${industry} – ${targetAudience} (${suffixEn})`,
    }));

  // 1) kapcsolható: ha nincs kulcs vagy USE_AI!=true, marad mock (0 Ft)
  const useAi = process.env.USE_AI === "true" && !!process.env.OPENAI_API_KEY;
  if (!useAi) {
    const ideas = buildIdeasFallback("minta szoveg", "sample text");
    return res.json({ ideas, source: "mock" });
  }

  // 2) OpenAI hívás
  try {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const instructions =
      language === "hu"
        ? "Te egy marketing asszisztens vagy magyar kisvállalkozóknak. Rövid, posztolható ötleteket adj."
        : "You are a marketing assistant. Provide short, post-ready ideas.";

    // Fontos: JSON-t kérünk vissza, hogy stabilan tudjuk parse-olni
    const input =
      language === "hu"
        ? `Üzletág: ${industry}
Célközönség: ${targetAudience}

Adj ${count} db posztötletet. Válasz formátum: csak tiszta JSON, pontosan így:
{"ideas":[{"text":"..."}]} 
Nincs extra szöveg.`
        : `Industry: ${industry}
Target audience: ${targetAudience}

Give ${count} post ideas. Response format: ONLY pure JSON exactly:
{"ideas":[{"text":"..."}]}
No extra text.`;

    const resp = await openai.responses.create({
      model,
      instructions,
      input,
      // költségkontroll: rövid output
      max_output_tokens: 300,
      temperature: 0.8,
    });

    const raw = resp.output_text?.trim() || "";

    // 3) Parse + validálás (ha a modell mégis mellébeszélne)
    let json: any;
    try {
      json = JSON.parse(raw);
    } catch {
      // fallback: ha nem tiszta JSON jott, ne torjon a UI
      const ideas = buildIdeasFallback("AI valasz nem volt JSON", "AI non-JSON fallback");
      return res.json({ ideas, source: "fallback" });
    }

    const ideasArr = Array.isArray(json?.ideas) ? json.ideas : [];
    const ideas = ideasArr.slice(0, count).map((x: any, i: number) => ({
      id: String(i + 1),
      text: String(x?.text ?? "").trim(),
    })).filter((x: any) => x.text.length > 0);

    // ha üres lett, fallback
    if (ideas.length < 3) {
      const fallback = buildIdeasFallback("AI fallback", "AI fallback");
      return res.json({ ideas: fallback, source: "fallback" });
    }

    return res.json({ ideas, source: "openai", model });
  } catch (err: any) {
    console.error("OPENAI_ERROR:", err?.message ?? err);
    const ideas = buildIdeasFallback("kapcsolati hiba, fallback", "connection issue, fallback");
    return res.json({ ideas, source: "fallback_connection" });
  }
});

app.post('/generate-post', async (req, res) => {
  const parsed = GeneratePostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'INVALID_INPUT' });
  }

  const { industry, targetAudience, tone, language } = parsed.data;

  const mockPost = {
    hook:
      language === 'hu'
        ? 'Szeretnél magabiztosabban ragyogni?'
        : 'Want to stand out more confidently?',
    caption:
      language === 'hu'
        ? `A megfelelő ${industry} megoldás nemcsak szépít, hanem önbizalmat is ad. Megmutatom, hogyan hozhatod ki a legtöbbet belőle a(z) ${targetAudience} közönségnek.`
        : `The right ${industry} approach improves results and confidence. Here is how to make it work for ${targetAudience}.`,
    cta:
      language === 'hu' ? 'Írj üzenetet időpontért!' : 'Send a message to get started!',
    hashtags:
      language === 'hu'
        ? ['#vállalkozás', '#socialmedia', '#önbizalom']
        : ['#business', '#socialmedia', '#content'],
  };

  const useAi =
    process.env.USE_AI === 'true' && !!process.env.OPENAI_API_KEY;

  // 🟡 MOCK (költségmentes)
  if (!useAi) {
    return res.json({ source: 'mock', post: mockPost });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const toneMap: Record<string, string> = {
      friendly: 'barátságos, közvetlen',
      expert: 'szakértői, magabiztos',
      premium: 'exkluzív, prémium',
    };

    const prompt =
      language === 'hu'
        ? `
Készíts 1 közösségi média posztot a következő struktúrában:

HOOK: max 1 rövid mondat, figyelemfelkeltő
CAPTION: 2–3 rövid mondat
CTA: 1 cselekvésre ösztönző mondat
HASHTAGS: 3–5 releváns hashtag

Üzletág: ${industry}
Célközönség: ${targetAudience}
Hangnem: ${toneMap[tone]}

Válasz kizárólag JSON formátumban:
{
  "hook": "...",
  "caption": "...",
  "cta": "...",
  "hashtags": ["#...", "#..."]
}
`
        : `...`; // angol verzió később

    const resp = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 300,
      temperature: 0.7,
    });

   const raw0 = resp.output_text?.trim() ?? '';

// 1) ha ```json ... ``` vagy ``` ... ``` formában jön
const raw1 = raw0
  .replace(/^```json\s*/i, '')
  .replace(/^```\s*/i, '')
  .replace(/```$/i, '')
  .trim();

// 2) ha még mindig van előtte/utána szöveg, vágjuk ki az első { ... } blokkot
const start = raw1.indexOf('{');
const end = raw1.lastIndexOf('}');
const raw = (start !== -1 && end !== -1 && end > start) ? raw1.slice(start, end + 1) : raw1;

let post: any;
try {
  post = JSON.parse(raw);
} catch {
  console.error('RAW_OPENAI_TEXT:', raw0);
  return res.status(502).json({ error: 'AI_BAD_JSON', message: 'AI nem adott érvényes JSON-t.' });
}

// minimál validálás
if (!post?.hook || !post?.caption || !post?.cta || !Array.isArray(post?.hashtags)) {
  return res.status(502).json({ error: 'AI_BAD_SHAPE', message: 'AI JSON formátum hibás.' });
}

return res.json({ source: 'openai', post });
  } catch (e: any) {
    console.error('AI ERROR', e?.message);
    return res.json({ source: 'fallback_connection', post: mockPost });
  }
});


const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
