import Link from "next/link";
import { productos } from "@/data/productos";
import { getCategorias } from "@/lib/productos";
import { normalizarCategoriaPublica } from "@/lib/categorias";

/**
 * El mosaico muestra las categorías presentes en el catálogo publicado.
 *
 * Tarjeta horizontal: texto a la izquierda (título/contador/link), foto a la
 * derecha en un recuadro redondeado — no es texto-sobre-foto.
 *
 * Foto por categoría: se toma la primera foto válida de un producto publicado
 * de esa categoría, directamente desde el catálogo.
 */

function imagenCategoria(nombre: string): { src: string; alt: string } | null {
  if (nombre === "Deporte & Fitness") {
    return { src: "/img/home/cat-deporte-fitness.webp", alt: "Accesorios deportivos" };
  }

  const producto = productos.find(
    (p) => normalizarCategoriaPublica(p.categoria) === nombre && p.fotos[0]?.url && p.fotos[0]?.alt,
  );
  if (!producto) return null;
  return { src: producto.fotos[0].url, alt: producto.fotos[0].alt };
}

export function Mosaico() {
  const categorias = getCategorias();
  const tiles = categorias.map((cat, i) => ({
    slug: cat.slug,
    href: `/categoria/${cat.slug}`,
    titulo: cat.nombre,
    texto: `${cat.cantidad} ${cat.cantidad === 1 ? "modelo disponible" : "modelos disponibles"}.`,
    grande: i < 2,
    imagen: imagenCategoria(cat.nombre),
  }));

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
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )}
      </div>
    </Link>
  );
}
