"use client";

import { usePathname } from "next/navigation";
import { CONTACTO_CORREO, WHATSAPP_NUMERO } from "@/lib/config";

/**
 * En el handoff del Home (Home ARDY Import.dc.html) la franja superior existe
 * pero va vacía —es decir, no se ve—, así que en "/" no se renderiza. En el
 * resto de rutas se mantiene con su contenido de siempre.
 */
export function TopBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

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
