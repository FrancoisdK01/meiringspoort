# Meiringspoort veg verwoestende vloedskade

’n Scrollytelling-webwerf vir Estian Hobbs se finalejaarsprojek oor die 2026-vloed in Meiringspoort.

## Ontwikkel

```bash
npm install
npm run dev
```

## Bou

```bash
npm run build   # skryf na dist/
npm run preview
```

## Ontplooi

Die projek is ’n gewone Vite-webwerf. Op Vercel: koppel die repo, aanvaar die Vite-voorinstelling (bou-opdrag `vite build`, uitvoergids `dist`) en ontplooi.

## Struktuur

- `index.html` — die volledige verhaal, in Afrikaans
- `src/styles.css` — ontwerpstelsel en uitleg
- `src/main.js` en `src/modules/` — skrol-gedrewe grafika (GSAP ScrollTrigger en Lenis)
- `public/media/` — foto’s en video’s uit die oorspronklike dokument, geoptimeer vir die web
- `docs/superpowers/specs/` — ontwerpspesifikasie
