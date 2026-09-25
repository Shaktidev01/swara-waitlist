import './style.css';
import { createClient } from '@supabase/supabase-js';
import { heroBird, friendlyBird, formalBird } from './birds';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Parses a trusted, hand-authored SVG string (never user input) into a DOM
// node without touching innerHTML.
function svgNode(svg: string): Node {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  return doc.documentElement;
}

const brandMarkIcon = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="34" r="22" fill="#ffffff"/><circle cx="41" cy="27" r="4.2" fill="#0b2436"/><circle cx="42.3" cy="25.7" r="1.3" fill="#fff"/><path d="M52 32 L60 30 L53 36 Z" fill="#f2b135"/></svg>`;

const template = document.getElementById('page-template') as HTMLTemplateElement;
const app = document.querySelector<HTMLDivElement>('#app')!;
app.appendChild(template.content.cloneNode(true));

app.querySelector('#brand-mark-slot')!.appendChild(svgNode(brandMarkIcon));
app.querySelector('#hero-bird-slot')!.appendChild(svgNode(heroBird));
app.querySelector('#friendly-bird-slot')!.appendChild(svgNode(friendlyBird));
app.querySelector('#formal-bird-slot')!.appendChild(svgNode(formalBird));

document.getElementById('scroll-to-form')?.addEventListener('click', () => {
  document.getElementById('email')?.focus();
  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const form = document.getElementById('waitlist') as HTMLFormElement;
const errorEl = document.getElementById('form-error') as HTMLParagraphElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const formBody = document.getElementById('form-body') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.textContent = 'Enter a valid email address.';
    errorEl.hidden = false;
    return;
  }
  if (!supabase) {
    errorEl.textContent = 'Signups are not configured yet. Please try again shortly.';
    errorEl.hidden = false;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Joining…';

  const { error } = await supabase.from('sw_waitlist_signups').insert({
    email,
    name: name || null,
    source: document.referrer || 'direct',
  });

  submitBtn.disabled = false;
  submitBtn.textContent = 'Join the waitlist';

  if (error) {
    if (error.code === '23505') {
      errorEl.textContent = "You're already on the list — we'll email you soon.";
    } else {
      errorEl.textContent = 'Could not join right now. Please try again.';
      console.error(error);
    }
    errorEl.hidden = false;
    return;
  }

  renderSuccess(name, email);
  refreshCount();
});

function renderSuccess(name: string, email: string) {
  formBody.replaceChildren();

  const panel = document.createElement('div');
  panel.className = 'success-panel';

  const check = document.createElement('span');
  check.className = 'success-check';
  check.textContent = '✓';

  const textWrap = document.createElement('div');
  const strong = document.createElement('strong');
  strong.textContent = name ? `You're on the list, ${name}!` : "You're on the list!";
  const span = document.createElement('span');
  span.textContent = `We'll email ${email} when early access opens.`;
  textWrap.append(strong, span);

  panel.append(check, textWrap);
  formBody.appendChild(panel);
}

async function refreshCount() {
  const countEl = document.getElementById('waitlist-count');
  if (!countEl || !supabase) return;
  const { data, error } = await supabase.rpc('sw_waitlist_count');
  if (!error && typeof data === 'number') {
    countEl.textContent = data > 0 ? `${data.toLocaleString()} ${data === 1 ? 'person' : 'people'} already on the list.` : 'Be the first on the list.';
  }
}
refreshCount();
