# UX és képernyőspecifikáció – SocialBoost AI

## Design célok
- Következetes, egyszerű navigáció; a funkciók egymásra épülő logikus sorrendben érhetők el.
- Gyors állapotvisszajelzés minden generálási műveletnél (loading, eredmény, hiba).
- Hibamegelőzés: profil hiánya esetén a generáló oldalak azonnal jelzik, hogy először profilt kell kitölteni.
- Mobilbarát elrendezés, olvasható tipográfia, elegendő kontrasztarány.

## Képernyőspecifikáció
| Képernyő ID | Név | Cél | Fő elemek | Kapcsolódó use case | Állapotok | Hibák és üzenetek | Akadálymentességi szempont |
|---|---|---|---|---|---|---|---|
| SCR-HOME | Kezdőlap | alkalmazás bemutatása, belépésre ösztönzés | funkciókártya-sor, CTA, statisztikák, lépéssor, mock poszt, trust szekció | – | statikus | – | heading hierarchia, kontrasztarány |
| SCR-LOGIN | Bejelentkezés / Regisztráció | felhasználói azonosítás | e-mail mező, jelszó mező, belépés gomb, regisztráció gomb | UC-01 | üres, betöltés, hiba | hibás e-mail, rossz jelszó, hálózati hiba | label, fókuszsorrend, hibaüzenet screenreader-kompatibilis |
| SCR-ONBOARDING | Üzleti profil kitöltése | generálás bemeneti adatainak felvétele | iparág, célközönség, hely, korosztály, platform, cél, hangnem mezők, mentés gomb | UC-02 | üres, előtöltött (szerkesztés), mentés folyamatban | kötelező mező hiányzik | label minden input mellett, validációs visszajelzés |
| SCR-IDEAS | Ötletgenerálás | posztötletek és kész poszt generálása | generálás gomb, ötletkártyák listája, poszt eredmény panel, kedvenc gomb | UC-03, UC-04 | profil hiányzik, töltés, ötletek láthatók, poszt látható, hiba | profil hiányzik, generálási hiba | ötletkártyák fókuszálhatók, gomboknak látható felirat |
| SCR-PLANNER | Heti tartalomterv | 7 napos terv generálása és megtekintése | generálás gomb, napi kártyák, téma/hook/caption/CTA/hashtag mezők | UC-05 | profil hiányzik, töltés, terv látható, hiba | profil hiányzik, timeout | napi kártyák logikus tab-sorrendben |
| SCR-IMAGE-GEN | Képgenerálás | marketingkép generálása | stílus-választó, méret-választó, generálás gomb, eredménykép előnézet | UC-06 | profil hiányzik, töltés, kép látható, hiba | profil hiányzik, generálási hiba | kép alt szöveg, gomb felirat |
| SCR-LIBRARY | Könyvtár | kedvenc ötletek listázása és törlése | kedvenc kártyák listája, törlés gomb, üres állapot, betöltési állapot | UC-07 | töltés, üres, feltöltött, hiba | betöltési hiba | lista strukturált, törlés megerősíthető |

## UX validáció
Az alkalmazást a fejlesztés során manuálisan teszteltük a legfontosabb felhasználói folyamatokon: regisztráció és bejelentkezés, profil kitöltése, ötletgenerálás és kedvencmentés, heti terv generálása, képgenerálás. A tesztek során kiderült, hogy profil hiánya esetén a generáló oldalak visszajelzés nélkül hibát adtak, ezért bevezettük a `profile-missing` komponenst, amely egyértelmű tájékoztatást és navigációt ad. Emellett a heti terv generálásnál a hosszabb várakozási idő miatt betöltési visszajelzés és timeout-kezelés került a felületre.