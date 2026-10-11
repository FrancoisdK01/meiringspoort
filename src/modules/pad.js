// Die pad: ’n geel lyn wat met die leser se vordering "geverf" word,
// met ’n merker vir elke hoofstuk.
export function initPad({ gsap, ScrollTrigger }) {
  const verf = document.querySelector('.pad__verf');
  const lys = document.querySelector('.pad__merkers');
  const hoofstukke = [...document.querySelectorAll('[data-chapter]')];
  if (!verf || !lys) return;

  gsap.to(verf, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
  });

  let items = [];
  function plaas() {
    const totaal = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    lys.innerHTML = '';
    items = hoofstukke.map((sek) => {
      const li = document.createElement('li');
      const bo = sek.getBoundingClientRect().top + scrollY;
      // Die merker sit waar die lyn sal wees wanneer die hoofstuk bo-aan die skerm is
      const p = Math.min(0.985, Math.max(0.015, bo / totaal));
      li.style.top = `${p * 100}%`;
      li.innerHTML = `<i></i><span>${sek.dataset.chapter}</span>`;
      lys.append(li);
      return { li, sek };
    });
    werkBy();
  }

  function werkBy() {
    const y = scrollY + innerHeight * 0.45;
    let aktief = 0;
    items.forEach(({ sek }, i) => {
      if (sek.getBoundingClientRect().top + scrollY <= y) aktief = i;
    });
    items.forEach(({ li }, i) => li.classList.toggle('is-aktief', i === aktief));
  }

  plaas();
  ScrollTrigger.addEventListener('refresh', plaas);
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: werkBy });
}
