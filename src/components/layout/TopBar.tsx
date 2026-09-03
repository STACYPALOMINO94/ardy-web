import { CONTACTO_CORREO, WHATSAPP_NUMERO } from "@/lib/config";

export function TopBar() {
  return (
    <div className="bg-marino-3 text-[#93A3B4] text-[0.8rem] py-[7px]">
      <div className="mx-auto max-w-[1240px] px-5 flex justify-between gap-4 flex-wrap">
        <span>Importación aérea desde China · Entrega en Lima y provincias</span>
        <span className="flex gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ambar-2"
          >
            WhatsApp
          </a>
          <span>·</span>
          <a href={`mailto:${CONTACTO_CORREO}`} className="hover:text-ambar-2">
            {CONTACTO_CORREO}
          </a>
        </span>
      </div>
    </div>
  );
}
