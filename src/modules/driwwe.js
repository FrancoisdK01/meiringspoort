// Die 25 driwwe, van suid (onder) na noord (bo), geteken soos die leser skrol.
const NAME = [
  'Spookdrif', 'Skansdrif', 'Damdrif', 'Boesmansdrif', 'Skelmkloofdrif',
  'Aalwyndrif', 'Nooiensboomdrif', 'Steweldrif', 'Perskeboomdrif', 'Sanddrif',
  'Herriedrif', 'Rabbie- of Witperddrif', 'Ou Toldrif', 'Wadrif', 'Witfonteindrif',
  'Uitspandrif', 'Watervaldrif', 'Ontploffingsdrif', 'Tweede Toldrif', 'Rooiuitspanningdrif',
  'Pereboomdrif', 'Valsdrif of Bloupuntdrif', 'Wasgatdrif', 'Opmetingsdrif', 'Laastedrif',
];
const NOTAS = {
  11: 'Langenhoven se Herrie, 1929',
  13: 'die ou tolhek',
  17: 'die waterval',
  25: 'eerste drif van Klaarstroom af',
};

// Die kronkelpad deur die kloof: begin onder (suid), eindig bo (noord).
const PAD = 'M 276 962 C 280 920, 204 894, 194 847 S 340 778, 324 725 S 182 662, 200 610 S 344 542, 316 491 S 188 424, 208 373 S 336 310, 306 259 S 200 200, 224 149 S 302 88, 262 37';

export function initDriwwe({ ScrollTrigger }) {
  const wrapper = document.querySelector('#driwwe-kaart');
  const svg = wrapper?.querySelector('.driwwe');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const rivier = svg.querySelector('.driwwe__rivier');
  const spoor = svg.querySelector('.driwwe__spoor');
  const pad = svg.querySelector('.driwwe__pad');
  const merkers = svg.querySelector('.driwwe__merkers');
  const huidige = wrapper.querySelector('.driwwe__huidige');
  const stappe = [...wrapper.querySelectorAll('.stap')];

  [rivier, spoor, pad].forEach((p) => p.setAttribute('d', PAD));
  const L = pad.getTotalLength();
  pad.style.strokeDasharray = `${L}`;
  pad.style.strokeDashoffset = `${L}`;

  const driwwe = NAME.map((naam, i) => {
    const t = (i + 0.5) / NAME.length;
    const pt = pad.getPointAtLength(L * t);
    const links = i % 2 === 1;
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', `drif${links ? ' drif--links' : ''}${i === 10 ? ' drif--herrie' : ''}`);
    g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);

    const sirkel = document.createElementNS(ns, 'circle');
    sirkel.setAttribute('r', i === 10 ? '9' : '7');
    g.append(sirkel);

    const nommer = document.createElementNS(ns, 'text');
    nommer.setAttribute('class', 'drif__nommer');
    nommer.setAttribute('x', links ? '17' : '-17');
    nommer.setAttribute('y', '3.5');
    nommer.textContent = String(i + 1);
    g.append(nommer);

    const teks = document.createElementNS(ns, 'text');
    teks.setAttribute('class', 'drif__naam');
    teks.setAttribute('x', links ? '-19' : '19');
    teks.setAttribute('y', '5.5');
    teks.textContent = naam;
    g.append(teks);

    merkers.append(g);
    return { g, t, naam, i };
  });

  function werkBy(p) {
    pad.style.strokeDashoffset = `${L * (1 - p)}`;
    let nou = -1;
    driwwe.forEach((d) => {
      const sigbaar = p >= d.t - 0.012;
      d.g.classList.toggle('is-sigbaar', sigbaar);
      if (sigbaar) nou = d.i;
    });
    driwwe.forEach((d) => d.g.classList.toggle('is-nou', d.i === nou));
    if (huidige) {
      if (nou >= 0) {
        huidige.querySelector('b').textContent = `${nou + 1}. ${NAME[nou]}`;
        huidige.querySelector('span').textContent = NOTAS[nou + 1] || `${nou + 1} van 25 driwwe`;
      } else {
        huidige.querySelector('b').innerHTML = '&nbsp;';
        huidige.querySelector('span').innerHTML = '&nbsp;';
      }
    }
  }

  // Die getekende driwwe volg die stappe: wanneer ’n stap in die middel van die
  // skerm is, is presies soveel driwwe geteken as wat sy data-drif sê.
  let punte = [];
  function meet() {
    punte = stappe.map((s) => {
      const r = s.getBoundingClientRect();
      return { y: r.top + scrollY + r.height / 2, d: Number(s.dataset.drif) };
    });
    if (punte.length) punte.unshift({ y: punte[0].y - innerHeight * 0.6, d: 0 });
  }
  function vordering() {
    const y = scrollY + innerHeight / 2;
    if (!punte.length) return 0;
    if (y <= punte[0].y) return 0;
    for (let i = 1; i < punte.length; i++) {
      if (y <= punte[i].y) {
        const a = punte[i - 1];
        const b = punte[i];
        const t = (y - a.y) / Math.max(1, b.y - a.y);
        return (a.d + (b.d - a.d) * t) / NAME.length;
      }
    }
    return punte[punte.length - 1].d / NAME.length;
  }

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: () => werkBy(vordering()),
    onRefresh: () => { meet(); werkBy(vordering()); },
  });
  meet();
  werkBy(vordering());

  stappe.forEach((stap) => {
    ScrollTrigger.create({
      trigger: stap,
      start: 'top 62%',
      end: 'bottom 38%',
      onToggle: (self) => stap.classList.toggle('is-aktief', self.isActive),
    });
  });
}
