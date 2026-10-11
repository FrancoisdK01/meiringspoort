// Besigheid krimp van 100% tot sowat 20% soos die leser skrol: tot 80% minder.
export function initAfname({ gsap }) {
  const fig = document.querySelector('#afname');
  const vol = fig?.querySelector('.afname__vol');
  if (!vol) return;
  gsap.fromTo(
    vol,
    { scaleX: 1 },
    { scaleX: 0.2, ease: 'power2.inOut', scrollTrigger: { trigger: fig, start: 'top 85%', end: 'top 45%', scrub: 0.6 } },
  );
}
