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
 * La tarjeta se divide en dos franjas que nunca se pisan: arriba la foto sola
 * (sin texto encima), abajo una franja marino sólida de 80px con título,
 * contador y "Ver productos". Grandes: foto 200px + franja 80px = 280px total.
 * Pequeñas: foto 88px + franja 80px = 168px total.
 *
 * En las 2 tarjetas grandes la foto usa object-position "right center" (el
 * producto se ve completo a la derecha); en las pequeñas, "center".
 *
 * Foto opcional por categoría: si existe public/img/categorias/<slug>.jpg se usa
 * en la franja de foto; si no existe, color sólido + ícono centrado. Se detecta
 * en build time (Server Component), así que basta con dejar el archivo ahí — no
 * requiere tocar código.
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
          className={`group block overflow-hidden rounded-2xl transition-transform hover:-translate-y-[3px] ${
            t.grande ? "md:col-span-2" : ""
          }`}
        >
          {/* Franja de foto: sin texto encima */}
          <div className={`relative w-full ${t.grande ? "h-[200px]" : "h-[88px]"} ${t.imagen ? "" : t.clase}`}>
            {t.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.imagen}
                alt={t.titulo}
                className={`absolute inset-0 w-full h-full object-cover ${
                  t.grande ? "object-[right_center]" : "object-center"
                } transition-transform duration-300 group-hover:scale-[1.04]`}
              />
            ) : (
              <IconoCategoria
                categoria={t.titulo}
                color="#ffffff"
                sombra="rgba(0,0,0,.2)"
                className="absolute inset-0 m-auto w-[42%] h-[42%]"
              />
            )}
          </div>

          {/* Franja de texto: fondo marino sólido, 80px fijos, nunca se pisa con la foto */}
          <div className="h-[80px] bg-marino px-4 py-2 flex flex-col justify-center gap-0.5">
            <h3 className="text-white text-[1rem] leading-tight truncate">{t.titulo}</h3>
            <p className="text-white/80 text-[0.76rem] leading-tight truncate">{t.texto}</p>
            <span className="text-ambar-2 font-bold text-[0.76rem] leading-tight">Ver productos</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
