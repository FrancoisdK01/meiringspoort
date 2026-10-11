# Meiringspoort scrollytelling site — design spec

Date: 2026-10-11. Source: `Estian_HA2_Finalejaarsprojek (4).docx` by Estian Hobbs (student 2024070222), an Afrikaans long-form feature on the 2026 Meiringspoort flood. The PDF hand-in carries only the headline, blurb and a link, so this site is the actual submission.

## Goal

Turn the article into a single-page, Afrikaans, scroll-driven feature that reads like a NYT/Pudding piece: the student's words, photos and videos, plus a self-made infographic of the 25 driwwe (the lecturer asked for an own infographic and for subheadings and richer captions).

## Decisions

- Stack: Vite + vanilla JS, GSAP ScrollTrigger, Lenis smooth scroll, self-hosted fonts via fontsource. Static `dist/`, zero-config on Vercel.
- Content: the student's text verbatim. Only Afrikaans spelling mistakes may be corrected (e.g. "Augutus", "provinisiale", "Meringspoort", "bedywighede", "hospital", "Betrokkenis", "over aan", "voor en dag", "elkgeval", "Ten einde"); no rewording, no sentence restructuring, no paragraph splitting. Subheadings, chapter sub-decks, stat labels and captions for the site's own graphics are added interface copy; the infographic step text uses the student's own sentences. Francois confirmed this rule on 2026-10-11 after a first draft had reworded several passages.
- Media: both embedded WhatsApp videos extracted from the .docx OLE packages and re-encoded for web; images resized to max 1600px, served as JPEG/WebP; the then/now photo split into two halves for a comparison slider. The two YouTube Shorts the author supplied (NlecABVuq1w, Ac5usu9Hfq8) are the same two clips, so the site self-hosts the video and links to YouTube from the caption and credits.
- Language: everything in Afrikaans, including UI labels.

## Visual system

- Colours: `#17110d` wet-rock dark, `#e6d8bd` Karoo sand, `#8f3a1f` Swartberg sandstone, `#e9b949` N12 yellow edge line (signature accent), `#3f6b78` kloof pool, `#c4567c` malva.
- Type: Fraunces (display, numbers, pull quotes), Instrument Sans (body, captions, data). No mono face.
- Layout: single reading column, left-aligned, ~62ch; a vertical road line in the left rail draws with scroll and marks chapters; sticky full-viewport graphics with narrow text steps for the detour diagram and the driwwe map; photos break out full-bleed.
- Theme shifts: dark for flood/damage chapters, sand for people/history chapters, tweened by scroll position rather than hard cuts.
- Motion: scroll-linked only (line draw, path draw, count-up, scrub). No per-section fade-ups. `prefers-reduced-motion` disables scrubbing and smooth scroll.

## Sections (in order)

1. Hero: flood video loop, headline, deck, byline, scroll cue.
2. Standfirst (blurb).
3. Die ompad: sticky route diagram, 4 steps (direct 25 km/20 min; N12–N1 via Beaufort-Wes +2–2½ h; R62 Calitzdorp/Ladismith and R407 Prince Albert–Willowmore; trucks 292 km Willowmore / 330 km Laingsburg).
4. In 'n neutedop: R500 m, 2 years, 20 crossings damaged, 4 sections washed away, temporary fix Dec 2026, permanent 26 months.
5. Die premier se besoek: Winde quotes, stuck-truck photo, info centre photo, walk-through video.
6. Infografika: scroll-drawn SVG of the 25 driwwe (south to north) with the Herriedrif callout; the student's illustrated map alongside, credited as in the document.
7. Drone video (Vimeo 857878298, permission noted).
8. De Rust: flood timeline 1885/1981/1996/2026, town origin, interviews, malva project, race routes.
9. Prins Albert: News24 context, petition, mayor quote, closing Meiring quote.
10. Kassie: Toe en nou slider, 1858 history, Pierneef and Pieterse paintings, Covid-era art.
11. Credits and sources.

## Verification

Build passes; Playwright screenshots at 1440px and 390px for every section; Lighthouse-style checks: all images lazy, videos muted/playsinline, no console errors.
