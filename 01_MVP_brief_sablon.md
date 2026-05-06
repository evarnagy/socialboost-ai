# MVP brief – SocialBoost AI

## 1. Probléma és cél
- **Megoldandó probléma:** A kis- és középvállalkozások jelentős része nem rendelkezik dedikált marketing erőforrással, így rendszeres és minőségi közösségimédia-jelenlétet nehezen tudnak fenntartani. A tartalomkészítés időigényes, és szakmai tudást igényel, amellyel a legtöbb vállalkozó nem rendelkezik.
- **Célfelhasználók:** Magyar kisvállalkozók és egyéni vállalkozók, akik aktív közösségimédia-jelenlétet szeretnének fenntartani, de nem engedhetnek meg maguknak marketingest, és nincs idejük napi szinten tartalmat gyártani.
- **A termék ígérete:** A SocialBoost AI az iparág és célközönség megadásával másodpercek alatt posztötleteket, kész közösségimédia-posztokat, heti tartalomtervet és marketingképeket generál, személyre szabva, azonnal használható formátumban.

## 2. MVP határ
| Elem | MVP-ben benne van? | Indoklás | Elfogadási jel |
|---|---:|---|---|
| Felhasználói regisztráció és bejelentkezés | igen | személyes profil és tartalmak elkülönítéséhez szükséges | bejelentkezett felhasználó saját adatait látja |
| Üzleti profil felvétele (onboarding) | igen | a generálás bemenete, nélküle nem működik | profil mentése Firestore-ba sikeres |
| Posztötlet-generálás | igen | az alkalmazás alap értékajánlata | legalább 3 ötlet jelenik meg AI-forrásból |
| Strukturált poszt generálás | igen | kész, közzétehető formátum biztosítása | hook, caption, CTA, hashtag megjelenik |
| Heti tartalomterv generálása | igen | rendszeres tartalom tervezés támogatása | 7 napos terv generálódik és megjeleníthető |
| Képgenerálás (DALL-E 3) | igen | vizuális tartalom gyártásának segítése | kép URL visszaadva, megjeleníthető |
| Könyvtár / kedvencek | igen | mentett ötletek visszakereshetőségéhez szükséges | kedvencként mentett ötletek listázhatók |
| Admin panel | nem | nem szükséges az MVP funkcionalitásához | – |
| Közösségimédia-platform közvetlen publikálás | nem | API-integráció és OAuth meghaladja a szakdolgozat keretét | – |
| Analitika, riportálás | nem | nincs mért felhasználói bázis az MVP fázisban | – |
| Többnyelvű UI | részben | a generálás hu/en paraméterezhető, a felület magyarul jelenik meg | – |

## 3. Nem célok
- Közvetlen publikálás Instagram, Facebook, LinkedIn vagy X platformokra.
- Automatikus, időzített platformpublikálás (közvetlen posztolás Instagram/Facebook/LinkedIn felületekre).
- Csapatkezelés, több felhasználós munkaterület.
- Fizetős előfizetési rendszer, számlázás.
- SEO-eszközök, webanalitika.
- Mobilalkalmazás (natív iOS/Android).

## 4. Sikerességi mérőszámok
| Mérőszám | Célérték | Mérés módja |
|---|---:|---|
| Kritikus use case-ek teljesítése (generálás, mentés, visszatöltés) | 100% | manuális tesztesetek |
| Ötletgenerálás válaszideje (AI mód) | < 5 s | mérési megfigyelés |
| Heti terv generálás válaszideje | < 40 s | mérési megfigyelés (timeout 45 s) |
| Sikeres telepítés tiszta környezetben | igen | README alapján reprodukció |
| Fallback működés AI-hiba esetén | igen | USE_AI=false futtatás |