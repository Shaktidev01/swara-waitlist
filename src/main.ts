import './style.css';
import { createClient } from '@supabase/supabase-js';
import { mountChrome } from './shared';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

mountChrome('home');

const form = document.getElementById('waitlist') as HTMLFormElement;
const errorEl = document.getElementById('form-error') as HTMLParagraphElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const formBody = document.getElementById('form-body') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const useCase = (document.getElementById('use-case') as HTMLSelectElement).value;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.textContent = 'Enter a valid email address.';
    errorEl.hidden = false;
    return;
  }
  if (!useCase) {
    errorEl.textContent = "Let us know what you'll use Swara for.";
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
    use_case: useCase,
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
  if (!error && typeof data === 'number' && data > 0) {
    countEl.textContent = `${data.toLocaleString()} ${data === 1 ? 'person has' : 'people have'} already joined.`;
  }
}
refreshCount();
