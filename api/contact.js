const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, projectType, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    console.error('Contact form is not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL');
    return res.status(500).json({ error: 'Contact form is not configured' });
  }

  const html = `
<h2 style="font-family: sans-serif; color: #050810;">Novo orçamento solicitado — VELNOX.IA</h2>
<table style="font-family: sans-serif; font-size: 14px; color: #333; border-collapse: collapse;">
  <tr><td style="padding: 6px 0; font-weight: bold;">Nome:</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">E-mail:</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Telefone:</td><td style="padding: 6px 0;">${escapeHtml(phone) || '—'}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Tipo de projeto:</td><td style="padding: 6px 0;">${escapeHtml(projectType) || '—'}</td></tr>
</table>
<h3 style="font-family: sans-serif; font-size: 14px; color: #050810; margin-top: 20px;">Mensagem:</h3>
<p style="font-family: sans-serif; font-size: 14px; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</p>
<hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;">
<p style="font-family: sans-serif; font-size: 12px; color: #999;">Enviado pelo site VELNOX.IA — A velocidade nunca dorme.</p>
`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Site VELNOX.IA <${fromEmail}>`,
        to: toEmail,
        reply_to: email,
        subject: `Novo orçamento — ${name} (VELNOX.IA)`,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('Resend API error:', response.status, body);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return res.status(502).json({ error: 'Failed to send email' });
  }
}
