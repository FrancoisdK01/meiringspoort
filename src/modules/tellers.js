// Syfers tel op sodra hulle in sig kom. Afrikaanse duisendskeiding: ’n smal spasie.
export function formateer(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function initTellers({ gsap, ScrollTrigger, minderBeweging }) {
  document.querySelectorAll('.tel').forEach((el) => {
    const doel = Number(el.dataset.tel);
    const voor = el.dataset.voor || '';
    const na = el.dataset.na || '';
    const skryf = (v) => { el.textContent = `${voor}${formateer(v)}${na}`; };

    if (minderBeweging) { skryf(doel); return; }

    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(obj, { v: doel, duration: 1.6, ease: 'power3.out', onUpdate: () => skryf(obj.v) }),
    });
  });
}
