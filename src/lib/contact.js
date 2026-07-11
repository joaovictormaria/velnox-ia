import data from '@/data/static-data.json';

export const WHATSAPP_NUMBER = data.contact.whatsapp.number;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = data.contact.email;
export const INSTAGRAM_HANDLE = data.contact.instagram.handle;
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export function buildWhatsappMessageUrl(form, extraLines = []) {
  const lines = [
    '*Nova solicitação — VELNOX.IA*',
    '',
    `*Nome:* ${form.name}`,
    `*E-mail:* ${form.email}`,
    form.phone && `*Telefone:* ${form.phone}`,
    `*Tipo de projeto:* ${form.projectType}`,
    ...extraLines,
    '',
    '*Detalhes do projeto:*',
    form.message,
  ].filter(Boolean);

  return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
}
