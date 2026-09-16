import type { Metadata } from "next";
import Link from "next/link";
import { Slider } from "@/components/home/Slider";
import { BarraBusqueda } from "@/components/home/BarraBusqueda";
import { Mosaico } from "@/components/home/Mosaico";
import { TendenciasHome } from "@/components/home/TendenciasHome";
import { SolucionesHome } from "@/components/home/SolucionesHome";
import { PasosCompacto } from "@/components/home/PasosCompacto";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  // Título exacto de PROMPT.md — absoluto para no depender del template del layout raíz
  // en la ruta "/", donde Next.js no lo aplica de forma consistente.
  title: { absolute: "Merchandising importado por vía aérea para eventos | ARDY Import" },
  description:
    "Importación aérea de merchandising de alto valor para eventos con fecha fija. Producto en blanco o marcado en Lima, entregado en 3 a 4 semanas puerta a puerta.",
};

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden text-marino">
      <h1 className="sr-only">Merchandising importado por vía aérea para eventos con fecha</h1>
      <Slider />

      <section style={{ padding: "0 0 clamp(56px,7vw,88px)" }}>
        <div className="mx-auto max-w-[1240px]" style={{ padding: "0 clamp(20px,4vw,60px)" }}>
          <BarraBusqueda />
        </div>
      </section>

      <section id="categorias" style={{ padding: "0 0 clamp(56px,7vw,88px)" }}>
        <div className="mx-auto max-w-[1240px]" style={{ padding: "0 clamp(20px,4vw,60px)" }}>
          <div className="flex items-end justify-between gap-5 flex-wrap mb-8">
            <div>
              <p className="text-[11.5px] font-bold tracking-[.18em] text-oliva mb-2.5">EXPLORA NUESTRO CATÁLOGO</p>
              <h2 className="text-marino font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>
                Categorías
              </h2>
            </div>
            <Link href="/productos" className="text-[14.5px] font-semibold text-marino whitespace-nowrap">
              Ver todas las categorías →
            </Link>
          </div>
          <Mosaico />
        </div>
      </section>

      <TendenciasHome />
      <SolucionesHome />
      <PasosCompacto />
      <CtaFinal />
    </main>
  );
}
