# Project Plan – SocialBoost AI

## Egy mondatos értékajánlat

AI-alapú posztötlet és strukturált tartalom generátor vállalkozóknak, amely személyre szabott hook-okat, caption-eket és hashtageket és konkrét posztötleteket készít Firebase autentikációval, heti tervezővel és könyvtárral, közösségi öltetplatformmal, megkönnyítve a közösségi média tartalomkészítést kezdő vállalkozók számára.

## Képességek

| Képesség | Kategória | Komplexitás | Miért nem triviális? |
|---|---|---|---|
| Bejelentkezés és szerepkörök | Productization | M | Firebase Auth refresh token kezelése + role-based route védelem Angular Guard-okkal |
| AI-alapú poszt generálás | Value | L | OpenAI API integráció,heavy prompt engineering, válasz parsing és formázás |
| Ötletek könyvtára és kedvencek | Value | M | Firebase Firestore adatbázis, real-time sync, keresés és szűrés |
| Heti tervező (planner) | Value | L | Komplex ütemezés logika, drag-and-drop UI, helyi tárolás offline módhoz |
| Hibaállapot kezelése | Productization | M | Retry logika API hívásoknál + felhasználóbarát toast üzenetek |
| Unit és integrációs tesztek | Productization | M | Jasmine/Karma setup, komponens és service tesztek, CI/CD pipeline |
| Közösségi ötlet platform | Value | M | Felhasználók poszt ötleteinek megosztása és böngészése, like/vote rendszer Firestore-al |

**Kategória:** `Value` (felhasználó érzékeli) vagy `Productization` (minőséget garantál: auth, hibakezelés, tesztek, deploy) 

**Komplexitás:** `S` < 1 nap · `M` 2–5 nap · `L` 1+ hét

Minimum: 6 képesség, ebből 3 Productization, 2 L-es.

## A legnehezebb rész

Az AI API integráció és a prompt optimalizálás nem fog elsőre működni, mert az OpenAI válaszai inkonzisztensek lehetnek, és a magyar nyelvű tartalom generálásnál kulturális kontextust kell figyelembe venni, ami több iterációt igényel a megfelelő minőség eléréséhez.

## Tech stack – indoklással

| Réteg | Technológia | Miért ezt és nem mást? |
|---|---|---|
| UI | Angular 17+ (Standalone Components) | Modern, TypeScript-alapú keretrendszer gyors fejlesztéshez és skálázhatósághoz; React helyett, mert jobb enterprise support és kétirányú adatbinding; Vue helyett, mert erősebb tooling és közösség. |
| Backend / logika | Firebase (Cloud Functions) | Serverless megoldás gyors prototipizáláshoz; Node.js helyett, mert kevesebb infrastrukturális overhead; saját backend helyett, mert egyszerűbb deploy és skálázás. |
| Adattárolás | Firebase Firestore | NoSQL adatbázis real-time sync-kel; MongoDB helyett, mert Firebase integráció egyszerűbb; PostgreSQL helyett, mert kevesebb config. |
| Auth | Firebase Authentication | Beépített megoldás refresh tokenekkel; Auth0 helyett, mert olcsóbb és jobban integrálódik; saját JWT helyett, mert biztonságosabb és kevesebb kód. |

## Ami kimarad (non-goals)

- Többnyelvű támogatás (csak magyar)
- Komplex analitika dashboard
- Fizetett előfizetési modellek
- Integráció más közösségi média platformokkal (csak általános posztok)

## Ami még nem tiszta

- OpenAI API költségek és rate limiting kezelése hosszú távon
- Firebase pricing skálázásnál (ingyenes tier korlátai)
- AI promptok finomhangolása különböző üzletágakra
