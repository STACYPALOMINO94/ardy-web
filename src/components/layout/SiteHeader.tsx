"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCategorias } from "@/lib/productos";
import { useCotizacion } from "@/components/cotizacion/CotizacionContext";

const ENLACES = [
  { href: "/nuevos-modelos", texto: "Nuevos modelos" },
  { href: "/como-funciona", texto: "Cómo funciona" },
  { href: "/#publicos", texto: "Agencias y revendedores" },
  { href: "/sourcing-importacion-china", texto: "Sourcing" },
];

export function SiteHeader() {
  const categorias = getCategorias();
  const { cantidadItems } = useCotizacion();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropAbierto, setDropAbierto] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onClickFuera(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropAbierto(false);
      }
    }
    document.addEventListener("click", onClickFuera);
    return () => document.removeEventListener("click", onClickFuera);
  }, []);

  return (
    <header className="sticky top-0 z-[80] bg-marino shadow-[0_1px_0_rgba(0,0,0,.15)]">
      <nav className="flex items-center gap-6 px-5 max-w-[1240px] mx-auto min-h-16">
        <Link href="/" className="font-extrabold text-xl tracking-[-0.04em] text-white whitespace-nowrap">
          ARDY <span className="text-ambar-2">Import</span>
        </Link>

        <button
          className="md:hidden text-white text-2xl px-2.5 py-2 ml-auto"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          ☰
        </button>

        <ul
          id="menu-principal"
          className={`${
            menuAbierto ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-0.5 md:ml-auto items-stretch absolute md:static top-full left-0 right-0 bg-marino-2 md:bg-transparent py-2 md:py-0 list-none`}
        >
          <li className="relative flex" ref={dropRef}>
            <button
              className="flex items-center gap-1.5 text-[#DCE4EC] text-[0.88rem] px-3.5 min-h-16 md:min-h-16 py-3 md:py-0 font-medium hover:bg-marino-2 hover:text-white w-full md:w-auto justify-start md:justify-center"
              aria-expanded={dropAbierto}
              onClick={(e) => {
                e.stopPropagation();
                setDropAbierto((v) => !v);
              }}
            >
              Catálogo
              <span
                className="inline-block w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-current opacity-70"
                aria-hidden
              />
            </button>
            <div
              className={`${
                dropAbierto ? "block" : "hidden"
              } md:absolute md:top-full md:left-0 bg-marino-3 md:bg-crema-2 border-0 md:border md:border-linea min-w-[230px] py-2.5 shadow-[0_8px_24px_rgba(13,25,38,.16)]`}
            >
              {categorias.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="block px-[18px] py-2.5 text-[0.88rem] text-[#B9C7D6] md:text-marino pl-9 md:pl-[18px] hover:bg-marino md:hover:bg-crema hover:text-white md:hover:text-ambar"
                >
                  {cat.nombre}
                </Link>
              ))}
              <Link
                href="/productos"
                className="block px-[18px] py-2.5 text-[0.88rem] text-[#B9C7D6] md:text-marino pl-9 md:pl-[18px] hover:bg-marino md:hover:bg-crema hover:text-white md:hover:text-ambar"
              >
                Ver todo el catálogo
              </Link>
            </div>
          </li>
          {ENLACES.map((en) => (
            <li key={en.href}>
              <Link
                href={en.href}
                className="flex items-center text-[#DCE4EC] text-[0.88rem] px-3.5 min-h-16 md:min-h-16 py-3 md:py-0 font-medium hover:bg-marino-2 hover:text-white"
              >
                {en.texto}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <Link
            href="/#lista"
            className="bg-ambar text-marino-3 px-4 py-2.5 text-[0.88rem] font-bold hover:bg-ambar-2"
          >
            Mi cotización
            <span className="bg-marino-3 text-ambar-2 rounded-full px-2 py-0.5 ml-1.5 text-[0.8rem]">
              {cantidadItems}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
