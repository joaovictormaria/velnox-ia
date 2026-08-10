const STORAGE_KEY = 'velnox_lead_source';

function inferFromReferrer(referrer) {
  if (!referrer) return 'direto';

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    if (host === 'l.instagram.com' || host.includes('instagram.com')) return 'instagram';
    if (host.includes('facebook.com') || host.includes('fb.com')) return 'facebook';
    if (host.includes('whatsapp.com') || host.includes('wa.me')) return 'whatsapp';
    if (host.includes('google.')) return 'google';
    if (host.includes('linkedin.com')) return 'linkedin';
    return `referencia:${host}`;
  } catch {
    return 'direto';
  }
}

export function captureLeadSource() {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const source = utmSource || inferFromReferrer(document.referrer);

  sessionStorage.setItem(STORAGE_KEY, source);
}

export function getLeadSource() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY);
}
