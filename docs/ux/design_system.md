# Design System / Vizuális nyelv

---

## UI könyvtár / komponensek

A projekt saját fejlesztésű UI rendszerre épül, külső komponens library nélkül.

Fő technológiák:
- Angular (frontend framework)
- Custom CSS design system (CSS variables + utility classok)
- Flexbox / Grid layout

Komponens típusok:
- `.card` – tartalom dobozok
- `.btn` – gombok (primary / secondary / ghost / subtle)
- `.input` – form input mezők
- `.form` – form struktúrák
- `.ideas`, `.post-result`, `.profile-form` – feature-specifikus komponensek

---

## Színpaletta

### Brand színek
- Primary: `#245a85`
- Primary dark: `#1f4e74`
- Primary deeper: `#1a3f5d`

### Accent
- Accent: `#f3aa54`

### State színek
- Success: implicit (nem definiált külön, default zöld helyett brand)
- Warning: nincs külön definiálva
- Error / Danger: `#b53b45`
- Error background: `#fff2f3`

### Text
- Main text: `#142033`
- Strong text: `#0b1324`
- Muted text: `#5f6e84`

### Surfaces
- Surface 0 (glass): `rgba(255,255,255,0.76)`
- Surface 1: `#ffffff`
- Surface 2: `#f7f9fc`
- Border: `#dde4f0`

### Background
- Main background: linear-gradient(160deg, #f4f6f9 → #edf1f8 → #e8edf7)

---

## Tipográfia

### Font stack
- Primary: `'Segoe UI Variable', 'Segoe UI', 'Trebuchet MS', sans-serif`
- Headings: `'Bahnschrift', 'Segoe UI Semibold', sans-serif`

### Méretezés (implicit rendszer)
- H1–H3: nagy, 20–24px környéke
- Body: 14–16px
- Small text: 12–14px (`.muted`, `.mini`)

### Font weight
- Regular: 400–500
- Medium: 600–650
- Bold: 700–850 (kiemelések, CTA)

---

## Spacing / Grid

Alap egység: **8px rendszer**

Tokenek:
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`

Container:
- Max width: `1240px`
- Padding: `24px`

Layout:
- Flexbox alapú komponensek
- Grid használat listákhoz (`.ideas-list`, `.sideList`)

---

## Border radius

- sm: 12px
- md: 16px
- lg: 22px
- xl: 28px
- fully rounded: 999px (chip, badge)

---

## Árnyékok

- Small: `0 4px 14px rgba(14,25,46,0.06)`
- Medium: `0 14px 38px rgba(14,25,46,0.09)`
- Card default: medium shadow

---

## Ikonkészlet

- Nincs külső icon library (pl. Material / Lucide)
- Egyszerű Unicode / custom CSS iconok
- Emoji + CSS based UI elemek (pl. `.ok` badge)

---

## Sötét mód

❌ Nem támogatott natívan

A rendszer jelenleg light-only design systemet használ.

---

## Reszponzív breakpointok

- Mobile: < 860px
- Tablet: 860px – 1200px
- Desktop: > 1200px

Fő breakpoint használat:
- `.ideas-list`, `.idea-item` mobilon column layoutra vált

---

## Animációk / interakciók

- Page transition: `fadeUp 280ms`
- Hover: translateY(-1px)
- Button press feedback: transform reset
- Focus state: brand color glow

---

## Design alapelvek

- Light glassmorphism (semi-transparent surfaces)
- Soft shadows (nem agresszív UI)
- Minimal, content-first layout
- Erős CTA gombok kontrasztos brand színnel
- Kártya alapú UI

---

## Forrás / inspiráció

- Saját design system (no external UI kit)
- Modern SaaS dashboard minták
- Social media content tools UI (pl. Buffer / Hootsuite jelleg)