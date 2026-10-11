// 200 kolle, elkeen 100 steggies. 60 is geplant (6 000); die doelwit is tot 20 000.
export function initMalvas({ gsap, ScrollTrigger, minderBeweging }) {
  const veld = document.querySelector('#malvas .malvas__veld');
  if (!veld) return;
  const TOTAAL = 200;
  const GEPLANT = 60;
  const kolle = [];
  for (let i = 0; i < TOTAAL; i++) {
    const k = document.createElement('i');
    if (i < GEPLANT) k.classList.add('is-geplant');
    veld.append(k);
    kolle.push(k);
  }

  if (minderBeweging) {
    kolle.forEach((k) => { k.style.transform = 'none'; k.style.opacity = '1'; });
    return;
  }

  ScrollTrigger.create({
    trigger: veld,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(kolle.slice(GEPLANT), { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: { each: 0.004, from: 'start' } });
      gsap.to(kolle.slice(0, GEPLANT), { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: { each: 0.018, from: 'start' } });
    },
  });
}
