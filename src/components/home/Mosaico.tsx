import Link from "next/link";
import { getCategorias } from "@/lib/productos";
import { CATEGORIAS_MOSAICO_HOME } from "@/lib/categorias";

/**
 * Mosaico del Home: exactamente 6 categorías fijas (ver CATEGORIAS_MOSAICO_HOME),
 * en este orden — no se deriva dinámicamente de todas las categorías del catálogo,
 * a propósito, para que el grid de 2 tarjetas grandes + 4 pequeñas nunca quede
 * con huecos. Las 2 primeras del orden son las tarjetas grandes.
 *
 * Tarjeta horizontal: texto a la izquierda (título/contador/link), foto a la
 * derecha en un recuadro redondeado — no es texto-sobre-foto.
 *
 * Foto por categoría: son los assets aprobados del Handoff (image-slots
 * ardy-cat-*, exportados a public/img/home/cat-<slug>.webp) — producto recortado
 * sobre fondo blanco. Las fotos antiguas de public/img/categorias/ (producto
 * sobre fondo azul) NO pertenecen a este diseño y ya no se usan aquí.
 */
const IMAGENES_CATEGORIAS: Record<string, { src: string; alt: string }> = {
  tecnologia: { src: "/img/home/cat-tecnologia.webp", alt: "Cargador inalámbrico de bambú" },
  escritura: { src: "/img/home/cat-escritura.webp", alt: "Lapiceros premium" },
  "llaveros-accesorios": { src: "/img/home/cat-llaveros-accesorios.webp", alt: "Llaveros corporativos" },
  "bolsos-organizadores": { src: "/img/home/cat-bolsos-organizadores.webp", alt: "Organizador de viaje" },
  "deporte-fitness": { src: "/img/home/cat-deporte-fitness.webp", alt: "Tomatodo deportivo" },
  mascotas: { src: "/img/home/cat-mascotas.webp", alt: "Accesorio para mascotas" },
};

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
      grande: i < 2,
      imagen: IMAGENES_CATEGORIAS[slug] ?? null,
    };
  });

  const grandes = tiles.filter((t) => t.grande);
  const pequenas = tiles.filter((t) => !t.grande);

  return (
    <div>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))" }}>
        {grandes.map((t) => (
          <Tarjeta key={t.slug} tile={t} />
        ))}
      </div>
      <div className="grid gap-6 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
        {pequenas.map((t) => (
          <Tarjeta key={t.slug} tile={t} />
        ))}
      </div>
    </div>
  );
}

interface Tile {
  slug: string;
  href: string;
  titulo: string;
  texto: string;
  grande: boolean;
  imagen: { src: string; alt: string } | null;
}

function Tarjeta({ tile: t }: { tile: Tile }) {
  return (
    <Link
      href={t.href}
      className={`group flex items-stretch bg-white border border-[#F0EDE5] rounded-2xl shadow-[0_2px_14px_rgba(22,40,60,.04)] hover:shadow-card-hover transition-shadow ${
        t.grande ? "gap-5 p-[34px] min-h-[280px]" : "gap-4 p-[22px] min-h-[170px]"
      }`}
    >
      <div className={`${t.grande ? "flex-[1_1_44%]" : "flex-[1_1_50%]"} min-w-0 flex flex-col justify-between`}>
        <div>
          <h3 className={`font-bold text-marino ${t.grande ? "text-2xl mb-2" : "text-base leading-tight mb-1.5"}`}>
            {t.titulo}
          </h3>
          <p className={`text-gris ${t.grande ? "text-[14.5px]" : "text-[13px]"}`}>{t.texto}</p>
        </div>
        <span className={`font-semibold text-ambar ${t.grande ? "text-sm mt-6" : "text-[13px] mt-4"}`}>
          Ver productos →
        </span>
      </div>
      <div
        className={`${
          t.grande ? "flex-[1_1_52%] min-h-[200px] rounded-xl" : "flex-[1_1_46%] min-h-[110px] rounded-[10px]"
        } min-w-0 overflow-hidden bg-fog relative`}
      >
        {t.imagen && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.imagen.src}
            alt={t.imagen.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )}
      </div>
    </Link>
  );
}
