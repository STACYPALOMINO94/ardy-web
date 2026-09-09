import type { Metadata } from "next";
import { existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { Slider, type MediaSlide } from "@/components/home/Slider";
import { Validador } from "@/components/home/Validador";
import { Mosaico } from "@/components/home/Mosaico";
import { SeccionCarrusel } from "@/components/home/SeccionCarrusel";
import { Proceso } from "@/components/home/Proceso";
import { Publicos } from "@/components/home/Publicos";
import { Sourcing } from "@/components/home/Sourcing";
import { ListaCotizacion } from "@/components/home/ListaCotizacion";
import { FormularioCotizacion } from "@/components/home/FormularioCotizacion";
import { getDestacados, getNuevos } from "@/lib/productos";

export const metadata: Metadata = {
  // Título exacto de PROMPT.md — absoluto para no depender del template del layout raíz
  // en la ruta "/", donde Next.js no lo aplica de forma consistente.
  title: { absolute: "Merchandising importado por vía aérea para eventos | ARDY Import" },
  description:
    "Importación aérea de merchandising de alto valor para eventos con fecha fija. Producto en blanco o marcado en Lima, entregado en 3 a 4 semanas puerta a puerta.",
};

const DIR_BANNER = join(process.cwd(), "public", "img", "banner");

/**
 * Detecta en build time si hay video o foto propia para el slide N del banner
 * (public/img/banner/slide-N.mp4 o .jpg). Video tiene prioridad sobre foto si
 * ambos existen. Si no hay ninguno, Slider usa el ícono decorativo de siempre.
 */
function mediaDelSlide(n: number): MediaSlide | null {
  if (existsSync(join(DIR_BANNER, `slide-${n}.mp4`))) return { tipo: "video", src: `/img/banner/slide-${n}.mp4` };
  if (existsSync(join(DIR_BANNER, `slide-${n}.jpg`))) return { tipo: "imagen", src: `/img/banner/slide-${n}.jpg` };
  return null;
}

export default function Home() {
  const destacados = getDestacados();
  const nuevos = getNuevos();
  const mediaBanner: Array<MediaSlide | null> = [1, 2, 3].map(mediaDelSlide);

  return (
    <main>
      <h1 className="sr-only">Merchandising importado por vía aérea para eventos con fecha</h1>
      <Slider mediaBanner={mediaBanner} />
      <Validador />

      <section className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
          <h2>Por dónde empezar</h2>
          <Link href="/productos" className="text-[0.87rem] text-gris whitespace-nowrap hover:text-marino">
            Ver todo el catálogo
          </Link>
        </div>
        <Mosaico />
      </section>

      <SeccionCarrusel
        titulo="Productos destacados"
        paddingTop={64}
        accion={
          <Link href="/productos" className="text-[0.87rem] text-gris whitespace-nowrap hover:text-marino">
            Ver todos
          </Link>
        }
        productos={destacados}
      />

      <SeccionCarrusel
        id="nuevos"
        titulo="Productos nuevos"
        paddingTop={64}
        accion={<span className="text-[0.87rem] text-gris whitespace-nowrap">Actualizamos esta selección cada temporada</span>}
        productos={nuevos}
      />

      <ListaCotizacion />
      <Proceso />
      <Publicos />
      <Sourcing />
      <FormularioCotizacion />
    </main>
  );
}
