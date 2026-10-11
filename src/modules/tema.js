// Agtergrond wissel tussen nag (vloed en skade) en sand (mense en geskiedenis)
// volgens die blok wat die middel van die skerm beset.
export function initTema({ ScrollTrigger }) {
  const html = document.documentElement;
  const blokke = [...document.querySelectorAll('[data-theme]')];
  html.dataset.theme = blokke[0]?.dataset.theme || 'nag';

  blokke.forEach((blok) => {
    ScrollTrigger.create({
      trigger: blok,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) html.dataset.theme = blok.dataset.theme;
      },
    });
  });
}
