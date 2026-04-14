# User Journeys

---

## 1. Bejelentkezés és onboarding

**Persona:** Új felhasználó, aki először használja az alkalmazást és szeretne belépni, hogy posztokat generáljon.

**Belépési pont:** S01 — Landing oldal (app megnyitása / localhost / URL)

### Lépések:

1. S01 — Landing oldal  
   User rákattint a "Kezdjük" vagy bejelentkezés gombra.  
   → S02 (Login oldal) nyílik meg.  
   Hibaág: ha nem elérhető az oldal, üres/error state jelenik meg.

2. S02 — Login oldal  
   User beírja az emailt és jelszót, majd rákattint a bejelentkezésre.  
   → S07 Posztötletek vagy S03 (Üzletprofil) ha kitöltés szükséges.  
   Hibaág: hibás adat esetén error üzenet jelenik meg (invalid credential, wrong password stb.).

3. S03 — Üzletprofil oldal  
   User kitölti az üzleti adatokat és menti.  
   → S04 (Poszt generátor).  
   Hibaág: hiányzó mezők esetén nem lehet a tovább gombra kattintani, az kiszürkül.

**Sikerkritérium:** A user be van jelentkezve és eljut a generátor oldalra.

**Mért időtartam:** ~20–40 másodperc / 3–5 interakció

---

## 2. Poszt vagy posztötlet generálása

**Persona:** Aktív felhasználó, aki tartalmat szeretne generálni gyorsan közösségi médiára.

**Belépési pont:** S07 — Home oldal (bal oldali navbar / belépés után)

### Lépések:

1. S07 — Home oldal  
   User rákattint az "Ötletek" gombra.  
   → S04 (Ötlet és poszt generátor oldal)  

2. S04 — Generátor oldal  
   User ha már kitöltötte a profil oldalt az üzletág onnan és a célközönség megjelenik. Egyedül hangnemet kell választania.  
   User rákattint: "Poszt generálása" vagy "Ötlet generálása".  
   → AI request: `/generate-post` vagy `/generate-ideas`  
   Hibaág: AI Request probléma, Fetch gond, célközönség avagy üzletág törlése esetén törlés stb

3. S04 — Eredmény megjelenítés  
   AI válasz megjelenik gombtól függően melyikre kattint (hook, caption, CTA, hashtags).  
   User rákattint: "Mentés a könyvtárba".  
   → S05 (Könyvtár)

**Sikerkritérium:** A user elmentett vagy generált legalább 1 posztot.

**Mért időtartam:** ~20–40 másodperc / 2–3 interakció

---

## 3. Heti posztterv létrehozása

**Persona:** Marketinges felhasználó, aki strukturált heti tartalomtervet szeretne készíteni.

**Belépési pont:** S07 — Home oldal (navbar → Heti tervező)

### Lépések:

1. S07 — Home oldal  
   User rákattint a "Heti tervező" menüpontra.  
   → S06 (Heti tervező oldal)

2. S06 — Heti tervező  
   A profilban kitöltött adatok alapjánb generál.  
   User rákattint: "Heti terv generálása".  
   → API: `/generate-weekly-plan`  
   Hibaág: invalid input vagy AI timeout → fallback plan

3. S06 — Eredmény megjelenítés  
   7 napos posztterv megjelenik (Hétfő–Vasárnap).  
   User átnézi, esetleg újragenerálja.

**Sikerkritérium:** A user kap egy teljes 7 napos poszttervet.

**Mért időtartam:** ~30–40 másodperc / 3–6 interakció

---
