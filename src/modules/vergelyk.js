// Toe en nou: sleep die lyn (muis, vinger of pyltjies).
export function initVergelyk() {
  const raam = document.querySelector('#vergelyk .vergelyk__raam');
  const handvatsel = raam?.querySelector('.vergelyk__handvatsel');
  if (!raam || !handvatsel) return;

  let pos = 50;
  function stel(v) {
    pos = Math.max(0, Math.min(100, v));
    raam.style.setProperty('--pos', `${pos}%`);
    handvatsel.setAttribute('aria-valuenow', String(Math.round(pos)));
  }
  function vanGebeurtenis(e) {
    const r = raam.getBoundingClientRect();
    stel(((e.clientX - r.left) / r.width) * 100);
  }

  let sleep = false;
  raam.addEventListener('pointerdown', (e) => {
    sleep = true;
    raam.setPointerCapture(e.pointerId);
    vanGebeurtenis(e);
  });
  raam.addEventListener('pointermove', (e) => { if (sleep) vanGebeurtenis(e); });
  const los = () => { sleep = false; };
  raam.addEventListener('pointerup', los);
  raam.addEventListener('pointercancel', los);

  handvatsel.addEventListener('keydown', (e) => {
    const tree = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') { stel(pos - tree); e.preventDefault(); }
    if (e.key === 'ArrowRight') { stel(pos + tree); e.preventDefault(); }
    if (e.key === 'Home') { stel(0); e.preventDefault(); }
    if (e.key === 'End') { stel(100); e.preventDefault(); }
  });
}
