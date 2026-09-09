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
 * Misma estructura que ProductCard: recuadro de foto arriba (sin overlay, foto
 * limpia) + contenido (título, contador, "Ver productos") debajo sobre blanco.
 *
 * Foto opcional por categoría: si existe public/img/categorias/<slug>.jpg se usa
 * en el recuadro; si no existe, se usa color sólido + ícono decorativo. Se
 * detecta en build time (Server Component), así que basta con dejar el archivo
 * ahí — no requiere tocar código.
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
          className={`group block rounded-2xl overflow-hidden border border-linea bg-white transition-transform hover:-translate-y-[3px] ${
            t.grande ? "md:col-span-2" : ""
          }`}
        >
          <div className={`relative w-full ${t.grande ? "h-[280px]" : "h-[168px]"} ${t.imagen ? "bg-white" : t.clase}`}>
            {t.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.imagen}
                alt={t.titulo}
                className={`absolute inset-0 w-full h-full object-cover ${
                  t.grande ? "object-[center_top]" : "object-center"
                } transition-transform duration-300 group-hover:scale-[1.04]`}
              />
            ) : (
              <IconoCategoria
                categoria={t.titulo}
                color="#ffffff"
                sombra="rgba(0,0,0,.2)"
                className="absolute inset-0 m-auto w-[46%] h-[46%]"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-[1.05rem] text-marino">{t.titulo}</h3>
            <p className="text-[0.85rem] text-gris mt-1">{t.texto}</p>
            <span className="text-[0.83rem] font-bold text-ambar mt-2.5 inline-block">Ver productos</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
