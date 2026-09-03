"use client";

import Link from "next/link";
import { useState } from "react";
import type { Producto } from "@/data/productos";
import { formatPrecio } from "@/lib/productos";
import { getColorHex } from "@/lib/colores";
import { useCotizacion } from "@/components/cotizacion/CotizacionContext";
import { IconoCategoria } from "./IconoCategoria";

export function ProductCard({ producto }: { producto: Producto }) {
  const { estaEnCotizacion, alternar } = useCotizacion();
  const [tonoActivo, setTonoActivo] = useState(producto.colores[0] ?? "");
  const enCotizacion = estaEnCotizacion(producto.slug);

  return (
    <article className="bg-white border border-linea flex flex-col transition-[border-color,transform] hover:border-linea-2 hover:-translate-y-0.5">
      <Link
        href={`/productos/${producto.slug}`}
        className="group relative h-[240px] w-full bg-white flex items-center justify-center overflow-hidden border-b border-linea cursor-zoom-in"
        aria-label={`Ver ficha de ${producto.nombre}`}
      >
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start z-[3]">
          {producto.esNovedad && (
            <span className="text-[0.66rem] px-2 py-[3px] font-bold tracking-[0.04em] bg-ambar text-marino-3">
              Nuevo
            </span>
          )}
          {producto.permisoMtc && (
            <span className="text-[0.66rem] px-2 py-[3px] font-bold tracking-[0.04em] bg-alerta text-white">
              Permiso MTC
            </span>
          )}
          {producto.disponibilidad === "Bajo producción" && (
            <span className="text-[0.66rem] px-2 py-[3px] font-bold tracking-[0.04em] bg-oliva text-white">
              Bajo producción
            </span>
          )}
        </div>

        <IconoCategoria
          categoria={producto.categoria}
          color={getColorHex(tonoActivo)}
          className="w-[64%] h-[64%] transition-transform duration-300 group-hover:scale-[1.07]"
        />

        {producto.colores.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 z-[3]">
            {producto.colores.map((tono) => (
              <button
                key={tono}
                type="button"
                aria-label={`Tono ${tono}`}
                aria-pressed={tono === tonoActivo}
                onClick={(e) => {
                  e.preventDefault();
                  setTonoActivo(tono);
                }}
                className={`w-[15px] h-[15px] rounded-full border-2 border-white shadow-[0_0_0_1px_var(--color-linea-2)] ${
                  tono === tonoActivo ? "shadow-[0_0_0_2px_var(--color-marino)]" : ""
                }`}
                style={{ background: getColorHex(tono) }}
              />
            ))}
          </div>
        )}

        <span className="absolute inset-0 bg-[rgba(22,40,60,.62)] text-white flex items-center justify-center text-[0.85rem] font-semibold opacity-0 transition-opacity group-hover:opacity-100">
          Ver ficha
        </span>
      </Link>

      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[0.7rem] text-ambar font-bold tracking-[0.05em] mb-1">
          {producto.categoria.toUpperCase()}
        </p>
        <h3 className="text-marino mb-1.5 leading-snug font-semibold">{producto.nombre}</h3>
        <p className="text-[0.81rem] text-gris leading-snug mb-2.5">{producto.descripcionCorta}</p>
        <div className="text-[0.8rem] border-t border-linea pt-2.5 mt-auto flex justify-between gap-2 text-gris">
          <span>
            MOQ <b className="text-marino">{producto.moq}</b>
          </span>
          <span>
            Desde <b className="text-marino">{formatPrecio(producto.precios[1000])}</b>
          </span>
        </div>
        <button
          type="button"
          onClick={() => alternar(producto.slug)}
          className={`mt-2.5 border px-2.5 py-2.5 text-[0.85rem] font-semibold w-full ${
            enCotizacion
              ? "bg-oliva border-oliva text-white"
              : "border-marino text-marino bg-transparent hover:bg-marino hover:text-white"
          }`}
        >
          {enCotizacion ? "En tu cotización" : "Agregar a cotización"}
        </button>
      </div>
    </article>
  );
}
