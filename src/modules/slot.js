// Die slotfoto beweeg effens stadiger as die bladsy.
export function initSlot({ gsap, minderBeweging }) {
  const slot = document.querySelector('#slot');
  const foto = slot?.querySelector('.slot__foto');
  if (!foto || minderBeweging) return;
  gsap.fromTo(
    foto,
    { yPercent: -7 },
    { yPercent: 7, ease: 'none', scrollTrigger: { trigger: slot, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}
