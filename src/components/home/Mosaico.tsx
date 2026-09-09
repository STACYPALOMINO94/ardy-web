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
 * Título, contador y "Ver productos" van DENTRO del recuadro, sobre la foto.
 * Legibilidad: overlay muy sutil (máx 15% de opacidad) + text-shadow suave en el
 * texto, en vez de un overlay oscuro fuerte — la foto se sigue viendo clara.
 *
 * Foto opcional por categoría: si existe public/img/categorias/<slug>.jpg se usa
 * de fondo; si no existe, color sólido + ícono decorativo (sin overlay, ya es
 * legible sobre color plano). Se detecta en build time (Server Component), así
 * que basta con dejar el archivo ahí — no requiere tocar código.
 */
const CLASES_TILE = ["bg-marino", "bg-oliva", "bg-marino-2", "bg-oliva-2", "bg-marino", "bg-oliva-2"];
const DIR_IMAGENES_CATEGORIAS = join(process.cwd(), "public", "img", "categorias");
const SOMBRA_TEXTO = "[text-shadow:0_1px_4px_rgba(0,0,0,.55)]";

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
          className={`group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between text-white transition-transform hover:-translate-y-[3px] ${
            t.imagen ? "" : t.clase
          } ${t.grande ? "md:col-span-2 h-[280px]" : "h-[168px]"}`}
        >
          {t.imagen && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.imagen}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover ${
                  t.grande ? "object-[center_top]" : "object-center"
                } z-0 transition-transform duration-300 group-hover:scale-[1.04]`}
              />
              {/* Overlay muy sutil (12%) solo de apoyo — la legibilidad la da el text-shadow */}
              <div className="absolute inset-0 bg-marino-3/[.12] z-[1]" aria-hidden />
            </>
          )}
          <div>
            <h3 className={`text-[1.15rem] text-white relative z-[2] ${SOMBRA_TEXTO}`}>{t.titulo}</h3>
            <p className={`text-[0.85rem] text-white/90 mt-1.5 relative z-[2] max-w-[26ch] ${SOMBRA_TEXTO}`}>
              {t.texto}
            </p>
          </div>
          <span className={`text-[0.83rem] font-bold text-ambar-2 relative z-[2] mt-3.5 ${SOMBRA_TEXTO}`}>
            Ver productos
          </span>
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
