// Video’s speel net wanneer hulle in sig is; die stapvideo kry ’n klankknoppie.
export function initVideos() {
  const held = document.querySelector('.held__video');
  if (held) {
    const speel = () => held.play().catch(() => {});
    speel();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) speel(); }, { passive: true });
  }

  const stap = document.querySelector('.stapvideo__video');
  const knoppie = document.querySelector('.stapvideo__klank');
  if (stap) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) stap.play().catch(() => {});
        else stap.pause();
      }),
      { threshold: 0.35 },
    );
    io.observe(stap);

    knoppie?.addEventListener('click', () => {
      stap.muted = !stap.muted;
      const aan = !stap.muted;
      knoppie.setAttribute('aria-pressed', String(aan));
      knoppie.textContent = aan ? 'Klank af' : 'Klank aan';
      if (aan) stap.play().catch(() => {});
    });
  }
}
