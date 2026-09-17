"use client";

import { useEffect, useState } from "react";
import type { Producto } from "@/data/productos";

interface ItemGaleria {
  alt: string;
  url?: string;
}

/**
 * Inserta la transformación f_auto,q_auto en URLs de Cloudinary al momento de
 * renderizar (sin tocar las URLs originales almacenadas en productos.ts).
 * f_auto entrega el formato óptimo según el navegador (webp/avif) y q_auto
 * ajusta la calidad automáticamente; esto evita el bloqueo que sufren algunas
 * URLs originales sin transformar.
 */
function conTransformacionCloudinary(url: string): string {
  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto/"
  );
}

/**
 * Galería del diseño aprobado (handoff "Ficha de producto ARDY"): imagen
 * principal 1:1 sobre fog con radio 16px, 4 miniaturas y modal de zoom.
 * Cuando el producto no tiene fotografía real, los espacios quedan en blanco
 * (fondo fog + leyenda) tal como están aprobados en las capturas: no se
 * inventan imágenes ni se sustituyen por iconos.
 */
function construirGaleria(producto: Producto): ItemGaleria[] {
  if (producto.fotos.length > 0) {
    return producto.fotos.slice(0, 4).map((f) => ({ alt: f.alt, url: f.url }));
  }
  return Array.from({ length: 4 }, () => ({ alt: producto.nombre }));
}

const BOTON_CIRCULO =
  "absolute w-10 h-10 rounded-full bg-white border border-linea-soft shadow-hairline grid place-items-center text-marino font-semibold";

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

  function anterior() {
    setActivo((v) => (v + galeria.length - 1) % galeria.length);
  }
  function siguiente() {
    setActivo((v) => (v + 1) % galeria.length);
  }

  const item = galeria[activo];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square bg-fog rounded-lg border border-linea-soft flex items-center justify-center overflow-hidden">
        {item.url ? (
          // referrerPolicy="no-referrer": los CDN de Alicdn (1688/Alibaba) bloquean por
          // Referer ACL cuando la petición viene con el dominio de origen (403). Sin
          // enviar Referer, la sirven normal.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={conTransformacionCloudinary(item.url)}
            alt={item.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="px-12 text-center font-bold text-[12px] leading-[1.2] tracking-[0.14em] uppercase text-gris-light text-pretty">
            {producto.nombre}
          </span>
        )}

        <button
          type="button"
          onClick={() => setAmpliado(true)}
          aria-label="Ampliar imagen"
          className={`${BOTON_CIRCULO} top-4 right-4 text-[15px] leading-none`}
        >
          +
        </button>
        {galeria.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Imagen anterior"
              className={`${BOTON_CIRCULO} left-4 top-1/2 -mt-5 text-[16px] leading-none`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Imagen siguiente"
              className={`${BOTON_CIRCULO} right-4 top-1/2 -mt-5 text-[16px] leading-none`}
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {galeria.map((im, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === activo}
            aria-label={`Ver foto ${i + 1} de ${producto.nombre}`}
            onClick={() => setActivo(i)}
            className={`aspect-square bg-fog rounded-sm overflow-hidden border ${
              i === activo ? "border-ambar shadow-[0_0_0_1px_var(--color-ambar)]" : "border-linea-soft"
            }`}
          >
            {im.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={conTransformacionCloudinary(im.url)}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            )}
          </button>
        ))}
      </div>

      {ampliado && (
        <div
          className="fixed inset-0 z-[80] bg-[rgba(22,40,60,.72)] flex items-center justify-center p-12"
          role="dialog"
          aria-modal="true"
          aria-label={`${producto.nombre}, imagen ampliada`}
          onClick={() => setAmpliado(false)}
        >
          <button type="button" className="sr-only" onClick={() => setAmpliado(false)}>
            Cerrar
          </button>
          <div className="w-[min(72vh,720px)] max-w-full aspect-square bg-fog rounded-lg shadow-overlay flex items-center justify-center overflow-hidden">
            {item.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={conTransformacionCloudinary(item.url)}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="px-12 text-center font-bold text-[12px] leading-[1.2] tracking-[0.14em] uppercase text-gris-light">
                {producto.nombre}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
