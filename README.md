# Web na vyklízení bytů: vizualizace

Statický web (HTML + CSS + JS), žádný build krok.

- `index.html`, `styles.css`, `script.js`: samotný web
- `RESEARCH.md`: research konkurence
- `vercel.json`: konfigurace pro Vercel (noindex, bezpečnostní hlavičky)

## Nasazení na Vercel

1. vercel.com → **Add New… → Project** → importovat tento GitHub repozitář.
2. Framework Preset: **Other**. Build Command a Output Directory nechat prázdné.
3. **Deploy**. Hotovo, dostanete adresu `*.vercel.app`.

Nebo z terminálu: `npx vercel --prod`.

Web je záměrně `noindex`. Před ostrým spuštěním odstraňte hlavičku `X-Robots-Tag` z `vercel.json` a `<meta name="robots">` z `index.html`.

## Co doplnit

Název firmy, telefon, e-mail, IČO, adresa, lokalita, reference, čísla v pruhu důvěry a ceny v kalkulačce (`script.js`). Formulář zatím neodesílá, viz `WEBHOOK_URL` ve `script.js`.
