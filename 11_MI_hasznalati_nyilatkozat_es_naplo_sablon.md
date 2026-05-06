# MI-használati nyilatkozat és napló – SocialBoost AI

## Rövid nyilatkozat a szakdolgozatba
A dolgozat és a rendszer fejlesztése során mesterséges intelligencia alapú eszközöket (GitHub Copilot, ChatGPT) használtam kódvázak generálására, hibakeresési irányok feltárására, refaktorálási javaslatokhoz és szakdolgozati szövegrészek nyelvi finomítására. Az MI által javasolt tartalmakat minden esetben önállóan ellenőriztem, futtatással validáltam és a projekt kontextusához igazítottam. A rendszer architekturális döntéseit, az értékelő fejezeteket és a kritikai megállapításokat saját mérnöki munkám alapján készítettem. A szakmai felelősséget teljes egészében vállalom.

## MI-használati napló
| Dátum | Eszköz / modell | Feladat | Prompt röviden | Eredmény | Ellenőrzés módja | Beépült? | Saját módosítás |
|---|---|---|---|---|---|---|---|
| 2026-02 | GitHub Copilot | Angular service-ek vázainak generálása | Firestore-alapú CRUD service TypeScript-ben | service struktúra, metódusok | futtatás + manuális ellenőrzés | igen | típusok pontosítása, hibakezelés hozzáadása |
| 2026-02 | GitHub Copilot | Zod validációs séma | Express endpoint bemeneti séma, kötelező és opcionális mezők | séma váz | API hívással tesztelve | igen | enum értékek, default-ok finomítása |
| 2026-03 | ChatGPT | Prompt stratégia tervezése | Hogyan kérjünk strukturált JSON-t OpenAI-tól? | instructions + input minta | élő OpenAI hívással validálva | igen | prompt szöveg saját iparág-specifikus tartalmakkal |
| 2026-03 | GitHub Copilot | Fallback és JSON kinyerő logika | Strip code fence, extract JSON object from raw string | stripCodeFence és extractJsonObject függvény | edge case tesztek kézzel | igen | parseWeeklyPlanLoose saját, kézzel írva |
| 2026-03 | ChatGPT | Hibakeresés: JSON parse hiba a heti tervnél | Miért hiányos a modell JSON-válasza? | truncation okának azonosítása, max_output_tokens javaslat | élő API hívással tesztelve | igen | timeout + compact retry stratégia saját döntés |
| 2026-04 | ChatGPT | Szakdolgozati fejezetek fogalmazása | API bemutatása, Firestore struktúra leírása | fejezet tervezet | saját tudással összevetve, átírva | részben | gondolati mag, értékelő részek saját szöveg |
| 2026-04 | GitHub Copilot | Auth guard implementáció | Angular route guard bejelentkezés-ellenőrzéssel | guard váz | bejelentkezés nélkül tesztelve | igen | Firebase auth állapotkezelés saját logika |

## MI mint a termék része
A SocialBoost AI rendszer maga is MI-hívásokat végez az OpenAI API felé. Az alábbi szempontok szerint dokumentálva:

| Szempont | Részletek |
|---|---|
| **Bemenet** | Felhasználói profil adatai: industry, targetAudience, location, ageRange, platform, contentGoal, brandTone |
| **Kimenet** | Szöveges tartalom (ötletek, poszt, heti terv) JSON formátumban; képgenerálásnál URL |
| **Prompt** | Dinamikusan felépített, feladatspecifikus; JSON kimenet kikényszerítve |
| **Adatvédelem** | A felhasználói adatok kizárólag a kérés idejére kerülnek az OpenAI-hoz, perzisztálás nem történik |
| **Hibakezelés** | 400 validációs hiba, 502 AI-hiba, timeout esetén fallback kimenet |
| **Fallback** | Minden generáló endpoint mock/fallback adattal válaszol AI-hiba esetén |
| **Költség / latency** | gpt-4o-mini modell (alacsony költség); ötlet/poszt ~2–4 s, heti terv ~10–35 s |
| **Hallucináció ellenőrzés** | JSON séma validáció, kötelező mezők ellenőrzése; hiányos kimenet esetén fallback |
| **Naplózás** | Szerver oldalon console.error minden AI hibánál, source mező a válaszban (openai/mock/fallback) |
| **Felhasználói tájékoztatás** | A felület nem tájékoztatja explicit módon a generálás forrásáról; fejlesztési javaslat a jövőre |