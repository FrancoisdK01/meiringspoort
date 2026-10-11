import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/instrument-sans/index.css';
import '@fontsource-variable/instrument-sans/wght-italic.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { initPad } from './modules/pad.js';
import { initTema } from './modules/tema.js';
import { initRoetes } from './modules/roetes.js';
import { initTellers } from './modules/tellers.js';
import { initDriwwe } from './modules/driwwe.js';
import { initVloedlyn } from './modules/vloedlyn.js';
import { initAfname } from './modules/afname.js';
import { initMalvas } from './modules/malvas.js';
import { initVergelyk } from './modules/vergelyk.js';
import { initVideos } from './modules/videos.js';
import { initSlot } from './modules/slot.js';

gsap.registerPlugin(ScrollTrigger);

const minderBeweging = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Gladde skrol (slegs as die leser nie minder beweging verkies nie)
let lenis = null;
if (!minderBeweging) {
  lenis = new Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}

// Ankerskakels
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const teiken = document.querySelector(a.getAttribute('href'));
    if (!teiken) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(teiken, { offset: 0, duration: 1.4 });
    else teiken.scrollIntoView({ behavior: 'smooth' });
  });
});

const ctx = { gsap, ScrollTrigger, minderBeweging };

initTema(ctx);
initPad(ctx);
initRoetes(ctx);
initTellers(ctx);
initDriwwe(ctx);
initVloedlyn(ctx);
initAfname(ctx);
initMalvas(ctx);
initVergelyk(ctx);
initVideos(ctx);
initSlot(ctx);

// Herbereken sodra lettertipes en media gelaai is
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
