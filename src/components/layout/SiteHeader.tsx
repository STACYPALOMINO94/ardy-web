"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { construirLinkWhatsApp } from "@/lib/config";

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/productos", texto: "Productos" },
  { href: "/soluciones-corporativas", texto: "Soluciones corporativas" },
  { href: "/sourcing-importacion-china", texto: "Sourcing" },
  { href: "/como-funciona", texto: "Cómo funciona" },
];

/**
 * "Productos" es la entrada principal al catálogo: también queda activo en
 * la ficha de producto y en las páginas de categoría (/categoria/[slug]),
 * que siguen existiendo como filtro interno de Productos, no como ítem de nav.
 */
function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/productos") return pathname.startsWith("/productos") || pathname.startsWith("/categoria");
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-[80] bg-white border-b border-[#EFEDE6]">
      <div
        className="flex items-center justify-between max-w-[1240px] mx-auto min-h-[76px]"
        style={{ padding: "0 clamp(20px,4vw,60px)", gap: "clamp(12px,2vw,28px)" }}
      >
        <Link href="/" className="flex flex-col leading-none py-3.5 shrink-0">
          <span className="text-[26px] font-extrabold tracking-[.04em] text-marino">ARDY</span>
          <span className="text-[9px] font-semibold tracking-[.42em] text-ambar mt-1">IMPORT</span>
        </Link>

        <nav
          className="hidden lg:flex flex-1 items-center justify-center flex-wrap text-[14.5px] font-medium min-w-0"
          style={{ gap: "clamp(12px,2vw,34px)" }}
        >
          {ENLACES.map((en) => {
            const activo = esRutaActiva(pathname, en.href);
            return (
              <Link
                key={en.href}
                href={en.href}
                aria-current={activo ? "page" : undefined}
                className={`whitespace-nowrap ${activo ? "text-marino" : "text-[#6B6B6B] hover:text-ambar"}`}
              >
                {en.texto}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3.5 py-3 shrink-0">
          <Link
            href="/productos"
            aria-label="Buscar"
            className="w-[38px] h-[38px] grid place-items-center text-marino hover:text-ambar"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </Link>
          <a
            href={construirLinkWhatsApp("Hola, quiero cotizar merchandising con ARDY Import.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-marino text-white font-bold text-sm px-[22px] py-3 rounded-[8px] whitespace-nowrap hover:bg-ambar-accent"
          >
            Cotiza por WhatsApp
          </a>
        </div>

        <button
          className="lg:hidden ml-auto text-marino text-2xl px-2.5 py-2"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          ☰
        </button>
      </div>

      {menuAbierto && (
        <div id="menu-principal" className="lg:hidden border-t border-[#EFEDE6] bg-white px-5 py-2">
          <ul className="flex flex-col list-none">
            {ENLACES.map((en) => {
              const activo = esRutaActiva(pathname, en.href);
              return (
                <li key={en.href}>
                  <Link
                    href={en.href}
                    aria-current={activo ? "page" : undefined}
                    className={`flex items-center text-[0.95rem] py-3 ${
                      activo ? "text-marino font-bold" : "text-marino font-medium"
                    }`}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {en.texto}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
