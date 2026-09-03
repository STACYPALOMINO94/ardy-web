import type { Metadata } from "next";
import { getNuevos } from "@/lib/productos";
import { ProductCard } from "@/components/home/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Nuevos modelos de merchandising importado",
  description:
    "Los modelos que todavía no están en todos los catálogos de Lima: tarjetas NFC, sets metálicos, cables multipuerto y más. Actualizamos esta selección cada temporada.",
};

export default function NuevosModelosPage() {
  const nuevos = getNuevos();

  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Nuevos modelos", url: "/nuevos-modelos" },
        ])}
      />

      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h1>Nuevos modelos</h1>
        <span className="text-[0.87rem] text-gris whitespace-nowrap">Actualizamos esta selección cada temporada</span>
      </div>
      <p className="text-[0.92rem] text-gris max-w-[64ch] mb-8">
        Lo que todavía no está en todos los catálogos de Lima: la razón por la que una agencia no repite el llavero
        del año pasado. Mismo plazo, mismo modelo de importación aérea que el resto del catálogo.
      </p>

      {nuevos.length === 0 ? (
        <p className="text-gris">No hay modelos nuevos publicados por el momento.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {nuevos.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      )}
    </main>
  );
}
