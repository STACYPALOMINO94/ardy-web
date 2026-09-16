import { WHATSAPP_NUMERO } from "@/lib/config";

export function FloatingButtons() {
  return (
    <a
      className="fixed right-6 bottom-6 z-[90] flex items-center gap-2.5 bg-ambar text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-[0_6px_20px_rgba(22,40,60,.18)] hover:bg-ambar-accent"
      href={`https://wa.me/${WHATSAPP_NUMERO}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M8.6 9.1c.3 2.9 3.4 6 6.3 6.3l1.3-1.3-2-1.3-1 .8c-1-.5-1.9-1.4-2.4-2.4l.8-1-1.3-2z" />
      </svg>
      Cotizar por WhatsApp
    </a>
  );
}
