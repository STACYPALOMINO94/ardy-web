import { existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { getCategorias } from "@/lib/productos";
import { CATEGORIAS_MOSAICO_HOME } from "@/lib/categorias";
import { IconoCategoria } from "./IconoCategoria";

/**
 * Mosaico del Home: exactamente 6 categorías fijas (ver CATEGORIAS_MOSAICO_HOME),
 * en este orden — no se deriva dinámicamente de todas las categorías del catálogo,
 * a propósito, para que el grid 2 grandes + 4 pequeñas nunca quede con huecos.
 * Las 2 primeras del orden son las tarjetas grandes.
 *
 * Foto de fondo opcional por categoría: si existe public/img/categorias/<slug>.jpg
 * se usa como fondo (con overlay oscuro para legibilidad); si no existe, se usa el
 * color sólido + ícono decorativo de siempre. Se detecta en build time (Server
 * Component), así que basta con dejar el archivo ahí — no requiere tocar código.
 */
const CLASES_TILE = ["bg-marino", "bg-oliva", "bg-marino-2", "bg-oliva-2", "bg-marino", "bg-oliva-2"];
const DIR_IMAGENES_CATEGORIAS = join(process.cwd(), "public", "img", "categorias");

function rutaImagen(slug: string): string | null {
  return existsSync(join(DIR_IMAGENES_CATEGORIAS, `${slug}.jpg`)) ? `/img/categorias/${slug}.jpg` : null;
}

export function Mosaico() {
  const categorias = getCategorias();
  const porSlug = new Map(categorias.map((c) => [c.slug, c]));

  const tiles = CATEGORIAS_MOSAICO_HOME.map((slug, i) => {
    const cat = porSlug.get(slug);
    const nombre = cat?.nombre ?? slug;
    const cantidad = cat?.cantidad ?? 0;
    return {
      slug,
      href: `/categoria/${slug}`,
      titulo: nombre,
      texto:
        cantidad > 0
          ? `${cantidad} ${cantidad === 1 ? "modelo disponible" : "modelos disponibles"}.`
          : "Próximamente en el catálogo.",
      clase: CLASES_TILE[i % CLASES_TILE.length],
      grande: i < 2,
      imagen: rutaImagen(slug),
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {tiles.map((t) => (
        <Link
          key={t.slug}
          href={t.href}
          className={`relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between text-white transition-transform hover:-translate-y-[3px] ${
            t.clase
          } ${t.grande ? "md:col-span-2 min-h-[220px]" : "min-h-[168px]"}`}
        >
          {t.imagen && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.imagen}
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-marino-3/55 z-[1]" aria-hidden />
            </>
          )}
          <div>
            <h3 className="text-[1.15rem] text-white relative z-[2]">{t.titulo}</h3>
            <p className="text-[0.85rem] text-white/[.78] mt-1.5 relative z-[2] max-w-[26ch]">{t.texto}</p>
          </div>
          <span className="text-[0.83rem] font-bold text-ambar-2 relative z-[2] mt-3.5">Ver productos</span>
          {!t.imagen && (
            <IconoCategoria
              categoria={t.titulo}
              color="#ffffff"
              sombra="rgba(0,0,0,.2)"
              className={`absolute -right-[18px] -bottom-[18px] opacity-20 z-[1] ${t.grande ? "w-[170px]" : "w-[120px]"}`}
            />
          )}
        </Link>
      ))}
    </div>
  );
}
