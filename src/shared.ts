import { heroBird } from './birds';

// Parses a trusted, hand-authored SVG string (never user input) into a DOM
// node without touching innerHTML.
export function svgNode(svg: string): Node {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  return doc.documentElement;
}

const brandMarkIcon = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="34" r="22" fill="#ffffff"/><circle cx="41" cy="27" r="4.2" fill="#0b2436"/><circle cx="42.3" cy="25.7" r="1.3" fill="#fff"/><path d="M52 32 L60 30 L53 36 Z" fill="#f2b135"/></svg>`;

export type PageKey = 'home' | 'about' | 'integrations';

// Clones the page/header/footer <template>s into #app, fills every
// data-slot="brand-mark" / "hero-bird" with the mascot SVG, wires the active
// nav link, and returns the mounted page root.
export function mountChrome(activePage: PageKey): HTMLElement {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  const pageTemplate = document.getElementById('page-template') as HTMLTemplateElement;
  const headerTemplate = document.getElementById('header-template') as HTMLTemplateElement;
  const footerTemplate = document.getElementById('footer-template') as HTMLTemplateElement;

  app.appendChild(pageTemplate.content.cloneNode(true));
  const page = app.querySelector('.page') as HTMLElement;

  const headerSlot = page.querySelector('[data-slot="header"]')!;
  headerSlot.appendChild(headerTemplate.content.cloneNode(true));

  const footerSlot = page.querySelector('[data-slot="footer"]')!;
  footerSlot.appendChild(footerTemplate.content.cloneNode(true));

  page.querySelectorAll('[data-slot="brand-mark"]').forEach((el) => el.appendChild(svgNode(brandMarkIcon)));
  page.querySelectorAll('[data-slot="hero-bird"]').forEach((el) => el.appendChild(svgNode(heroBird)));

  const activeLink = page.querySelector(`.nav-links a[data-page="${activePage}"]`);
  activeLink?.classList.add('active');

  page.querySelectorAll('#scroll-to-form').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('email')?.focus();
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  return page;
}
