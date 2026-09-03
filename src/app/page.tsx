import type { Metadata } from "next";
import Link from "next/link";
import { Slider } from "@/components/home/Slider";
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

export default function Home() {
  const destacados = getDestacados();
  const nuevos = getNuevos();

  return (
    <main>
      <h1 className="sr-only">Merchandising importado por vía aérea para eventos con fecha</h1>
      <Slider />
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
        titulo="Destacados"
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
        titulo="Nuevos modelos"
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
