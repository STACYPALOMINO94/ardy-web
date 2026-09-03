"use client";

import { useEffect, useState } from "react";
import type { Producto } from "@/data/productos";
import { getColorHex } from "@/lib/colores";
import { IconoCategoria } from "@/components/home/IconoCategoria";

interface ItemGaleria {
  alt: string;
  url?: string;
  tono?: string;
}

function construirGaleria(producto: Producto): ItemGaleria[] {
  if (producto.fotos.length > 0) {
    return producto.fotos.slice(0, 4).map((f) => ({ alt: f.alt, url: f.url }));
  }
  const tonos = producto.colores.length > 0 ? producto.colores : ["default"];
  const items: ItemGaleria[] = [];
  for (let i = 0; i < 4; i++) {
    const tono = tonos[i % tonos.length];
    items.push({ alt: `${producto.nombre}, tono ${tono}.`, tono });
  }
  return items;
}

export function GaleriaProducto({ producto }: { producto: Producto }) {
  const galeria = construirGaleria(producto);
  const [activo, setActivo] = useState(0);
  const [ampliado, setAmpliado] = useState(false);

  useEffect(() => {
    if (!ampliado) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAmpliado(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ampliado]);

  const item = galeria[activo];

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setAmpliado(true)}
        aria-label="Ampliar imagen"
        className="h-[320px] sm:h-[420px] w-full bg-white border border-linea flex items-center justify-center overflow-hidden cursor-zoom-in"
      >
        <ImagenGaleria item={item} categoria={producto.categoria} className="w-[70%] h-[70%]" />
      </button>

      <div className="flex gap-2.5">
        {galeria.map((im, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === activo}
            aria-label={`Ver foto ${i + 1} de ${producto.nombre}`}
            onClick={() => setActivo(i)}
            className={`w-14 h-14 shrink-0 border bg-white flex items-center justify-center p-1.5 ${
              i === activo ? "border-2 border-marino" : "border-linea"
            }`}
          >
            <ImagenGaleria item={im} categoria={producto.categoria} className="w-full h-full" />
          </button>
        ))}
      </div>

      {ampliado && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(13,25,38,.85)] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`${producto.nombre}, imagen ampliada`}
          onClick={() => setAmpliado(false)}
        >
          <button
            className="absolute top-4 right-5 text-white text-3xl leading-none px-2 py-1"
            aria-label="Cerrar"
            onClick={() => setAmpliado(false)}
          >
            ×
          </button>
          <div
            className="bg-white max-w-[640px] w-full aspect-square flex items-center justify-center p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <ImagenGaleria item={item} categoria={producto.categoria} className="w-[80%] h-[80%]" />
          </div>
        </div>
      )}
    </div>
  );
}

function ImagenGaleria({
  item,
  categoria,
  className,
}: {
  item: ItemGaleria;
  categoria: string;
  className: string;
}) {
  if (item.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.url} alt={item.alt} loading="lazy" className={`${className} object-contain`} />;
  }
  return <IconoCategoria categoria={categoria} color={getColorHex(item.tono ?? "")} className={className} />;
}
