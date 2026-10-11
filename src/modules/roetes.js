// Die ompad: elke stap lig ’n roete op die skematiese kaart.
export function initRoetes({ ScrollTrigger }) {
  const kaart = document.querySelector('#roetes .kaart');
  const stappe = [...document.querySelectorAll('#roetes .stap')];
  if (!kaart || !stappe.length) return;

  function stel(n) {
    kaart.dataset.stap = n;
    stappe.forEach((s) => s.classList.toggle('is-aktief', s.dataset.stap === n));
  }

  stappe.forEach((stap) => {
    ScrollTrigger.create({
      trigger: stap,
      start: 'top 62%',
      end: 'bottom 38%',
      onEnter: () => stel(stap.dataset.stap),
      onEnterBack: () => stel(stap.dataset.stap),
    });
  });
}
