import { Resend } from 'resend';

function buildMessage(lead) {
  return [
    'Novo lead recebido — VELNOX.IA',
    '',
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    lead.phone && `Telefone: ${lead.phone}`,
    `Tipo de projeto: ${lead.projectType ?? '-'}`,
    '',
    `Mensagem: ${lead.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}

async function sendEmailNotification(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.NOTIFY_EMAIL_FROM || 'onboarding@resend.dev',
    to,
    subject: `Novo lead: ${lead.name}`,
    text: buildMessage(lead),
  });
}

async function sendWhatsappNotification(lead) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(buildMessage(lead))}&apikey=${encodeURIComponent(apikey)}`;
  await fetch(url);
}

export async function notifyNewLead(lead) {
  const results = await Promise.allSettled([sendEmailNotification(lead), sendWhatsappNotification(lead)]);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('Lead notification failed:', result.reason);
    }
  }
}
