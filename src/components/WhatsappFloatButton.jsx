import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/contact';

export default function WhatsappFloatButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.35)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
