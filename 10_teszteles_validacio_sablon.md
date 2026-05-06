# Tesztelés és validáció – SocialBoost AI

## Tesztterv
| Teszt ID | Típus | Cél | Előfeltétel | Lépések | Várt eredmény | Kapcsolódó követelmény | Eredmény |
|---|---|---|---|---|---|---|---|
| TC-01 | funkcionális | sikeres regisztráció | érvényes e-mail, erős jelszó | regisztráció gomb, adatok megadása | bejelentkezve, onboarding oldalra navigál | FK-01 | sikeres |
| TC-02 | funkcionális | sikeres bejelentkezés | létező felhasználó | e-mail + jelszó megadása, belépés | profillal rendelkező user az ideas oldalra, profil nélküli az onboardingra kerül | FK-01 | sikeres |
| TC-03 | funkcionális | profil mentése | bejelentkezett felhasználó | onboarding kitöltése, mentés | adatok Firestore-ban megjelennek, visszatölthetők | FK-02 | sikeres |
| TC-04 | funkcionális | ötletgenerálás AI nélkül | USE_AI=false, profil megvan | generálás gomb | fallback ötletek megjelennek | FK-03 | sikeres |
| TC-05 | funkcionális | ötletgenerálás AI-val | USE_AI=true, API kulcs megadva | generálás gomb | legalább 3 AI-generált ötlet | FK-03 | sikeres |
| TC-06 | funkcionális | poszt generálása | profil megvan | poszt generálás gomb | hook, caption, CTA, hashtag megjelenik | FK-04 | sikeres |
| TC-07 | funkcionális | heti terv generálása | profil megvan | generálás gomb | 7 napos terv kártyanézetben jelenik meg | FK-05 | sikeres |
| TC-08 | funkcionális | képgenerálás AI nélkül | USE_AI=false | stílus és méret kiválasztása, generálás | placeholder kép URL visszaadva | FK-06 | sikeres |
| TC-09 | funkcionális | kedvenc mentése és listázása | ötletek generálva | csillag gomb → library oldal | mentett ötlet megjelenik a könyvtárban | FK-07 | sikeres |
| TC-10 | funkcionális | kedvenc törlése | legalább 1 kedvenc | törlés gomb | elem eltűnik a listából | FK-07 | sikeres |
| TC-11 | negatív | érvénytelen API bemenet | szerver fut | hiányos JSON küldése POST /generate-ideas-ra | 400 INVALID_INPUT válasz | FK-03 | sikeres |
| TC-12 | negatív | védett oldal bejelentkezés nélkül | kijelentkezett user | /ideas URL-re navigálás | /login-ra irányít | FK-08 | sikeres |
| TC-13 | teljesítmény | ötletgenerálás válaszideje | API kulcs megadva | időmérés a kérés indításától a válasz megjelenéséig | < 5 s | – | sikeres |
| TC-14 | teljesítmény | heti terv generálás válaszideje | API kulcs megadva | időmérés generálásnál | < 40 s | – | sikeres |
| TC-15 | fallback | AI timeout kezelése | USE_AI=true, szerver lassú | heti terv generálás, 45 s timeout | fallback heti terv jelenik meg, nem üres oldal | FK-05 | sikeres |

## Validációs bizonyítékok
- Minden funkcionális teszteset manuálisan lefuttatva fejlesztői és éles konfigurációban is.
- A backend validáció Zod sémákkal automatikusan lefedett; érvénytelen kérés esetén 400-as hiba adódik vissza.
- Az auth guard működése ellenőrzött: bejelentkezés nélkül a védett oldalak nem érhetők el.
- Fallback logika ellenőrzött USE_AI=false konfigurációval: minden generáló végpont mock adattal válaszol.
- Timeout-kezelés a heti terv endpointnál: Promise.race + 45 s kliensoldali AbortController.
- Security alapellenőrzés: API kulcs .env-ben, nem kerül a verziókövető rendszerbe; CORS beállítva; bemeneti validáció minden endpointnál.