import Link from "next/link";
import type { Producto } from "@/data/productos";
import { formatPrecio, getPrecioDesde } from "@/lib/productos";
import { getColorHex } from "@/lib/colores";

export function TarjetaCatalogo({ producto }: { producto: Producto }) {
  const precioDesde = getPrecioDesde(producto);

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="flex flex-col bg-white border border-linea-soft rounded-md shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
    >
      <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
        {producto.fotos.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={producto.fotos[0].url}
            alt={producto.fotos[0].alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[12px] font-bold tracking-[.14em] text-gris-light uppercase">Foto de producto</span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        {producto.colores.length > 0 && (
          <div className="flex gap-1.5 items-center">
            {producto.colores.slice(0, 4).map((c) => (
              <span
                key={c}
                className="w-3 h-3 rounded-full border border-[rgba(22,40,60,.18)]"
                style={{ background: getColorHex(c) }}
              />
            ))}
          </div>
        )}
        <h3 className="text-marino font-bold text-[17px] leading-[1.35] tracking-[-0.015em]">{producto.nombre}</h3>
        <div className="flex items-baseline gap-1.5 mt-auto">
          {precioDesde !== null ? (
            <>
              <span className="text-[14px] text-gris">Desde</span>
              <span className="text-marino font-bold text-[18px]">{formatPrecio(precioDesde)}</span>
            </>
          ) : (
            <span className="text-marino font-bold text-[18px]">Precio bajo cotización</span>
          )}
        </div>
        <span className="mt-2 flex items-center justify-center gap-2 text-[14px] font-semibold py-[11px] px-4 rounded-sm bg-marino text-white hover:bg-marino-press">
          Ver ficha →
        </span>
      </div>
    </Link>
  );
}
