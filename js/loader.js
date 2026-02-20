const SLIDE_FILES = [
  'slides/01-hero.html',
  'slides/02-quote.html',
  'slides/03-iceberg.html',
  'slides/04-story.html',
  'slides/05-reviews.html',
  'slides/06-silence.html',
  'slides/07-solution.html',
  'slides/08-flow.html',
  'slides/09-pilot.html',
  'slides/10-cost.html',
  'slides/11-impact.html',
  'slides/12-team.html',
  'slides/13-cta.html',
];

export async function loadSlides() {
  const deck = document.getElementById('deck');
  const htmls = await Promise.all(
    SLIDE_FILES.map(f => fetch(f).then(r => r.text()))
  );

  // Parse and insert each slide safely using DOMParser
  const parser = new DOMParser();
  for (const html of htmls) {
    const doc = parser.parseFromString(html, 'text/html');
    const section = doc.body.firstElementChild;
    if (section) {
      deck.appendChild(document.adoptNode(section));
    }
  }
}
