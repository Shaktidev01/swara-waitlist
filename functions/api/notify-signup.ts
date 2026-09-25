interface Env {
  RESEND_API_KEY: string;
  WAITLIST_WEBHOOK_SECRET: string;
}

const FROM = 'Swara <swara@shaktiagenticengineers.in>';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const secret = request.headers.get('x-webhook-secret');
  if (!secret || secret !== env.WAITLIST_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body: { email?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const email = (body.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response('Invalid email', { status: 422 });
  }
  const name = (body.name || '').trim();
  const greeting = name ? `Hi ${name},` : 'Hi,';

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: email,
      subject: "You're on the Swara waitlist 🎉",
      text: `${greeting}\n\nThanks for joining the Swara founding-member waitlist!\n\nAs a founding member you get:\n- Free setup and infrastructure, at no cost\n- Free calling credits for outbound and inbound calls\n- Your first AI employee built for free\n- Free WhatsApp and Google Calendar integration\n- Founding-member pricing and privileges\n- Priority, on-time support\n\nWe'll email you the moment early access opens.\n\n— The Swara team`,
    }),
  });

  if (!resendResponse.ok) {
    console.error('Resend send failed', resendResponse.status, await resendResponse.text());
    return new Response('Email send failed', { status: 502 });
  }

  return new Response('ok', { status: 200 });
};
