import data from '@/data/static-data.json';

export const WHATSAPP_NUMBER = data.contact.whatsapp.number;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = data.contact.email;
export const INSTAGRAM_HANDLE = data.contact.instagram.handle;
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export function buildWhatsappMessageUrl(form, extraLines = []) {
  const lines = [
    '⚡ *Novo contato — VELNOX.IA*',
    '',
    `🙋 ${form.name}`,
    `📧 ${form.email}`,
    form.phone && `📱 ${form.phone}`,
    `📁 ${form.projectType}`,
    ...extraLines,
    '',
    `💬 ${form.message}`,
  ].filter(Boolean);

  return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
}
