// Die water styg teen die jaarmerkers soos die leser nader skrol.
export function initVloedlyn({ gsap }) {
  const fig = document.querySelector('#vloedlyn');
  if (!fig) return;
  const basis = 260;
  fig.querySelectorAll('.vloedlyn__water').forEach((rect) => {
    const hoog = Number(rect.dataset.hoog);
    gsap.fromTo(
      rect,
      { attr: { height: 0, y: basis } },
      {
        attr: { height: hoog, y: basis - hoog },
        ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top 85%', end: 'top 40%', scrub: 0.6 },
      },
    );
  });
}
