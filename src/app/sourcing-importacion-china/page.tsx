import type { Metadata } from "next";
import { SOURCING_PRECIO_PH } from "@/lib/config";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Sourcing e importación de producto desde China",
  description:
    "¿No encuentras el producto en nuestro catálogo? Lo buscamos en China: 3 opciones de proveedor con ficha técnica y costo puesto en Lima.",
};

export default function SourcingPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Sourcing en China", url: "/sourcing-importacion-china" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">¿No está en el catálogo? Lo buscamos en China</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Cotizar sobre el catálogo que ya tenemos es gratis y siempre lo será. Buscar un producto nuevo que nadie
          más tiene en el mercado local tiene un costo de búsqueda, y ese costo se descuenta íntegro si la
          importación se ejecuta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start mb-12">
          <div className="border border-linea p-6">
            <h2 className="mb-2 text-[1.05rem]">Qué incluye la búsqueda</h2>
            <ul className="text-[0.9rem] text-gris list-disc pl-5 space-y-1.5">
              <li>3 opciones de proveedor verificado en China.</li>
              <li>Ficha técnica de cada opción.</li>
              <li>Costo puesto en Lima, con el mismo modelo de plazo aéreo del resto del catálogo.</li>
              <li>Si ya compraste con nosotros antes, la búsqueda va incluida.</li>
            </ul>
          </div>
          <div className="bg-crema-2 border-l-[5px] border-ambar p-6 min-w-[236px]">
            <p className="text-[1.7rem] font-extrabold text-marino tracking-[-0.03em]">S/ {SOURCING_PRECIO_PH}</p>
            <p className="text-[0.82rem] text-gris mt-1.5">
              Costo de búsqueda. Se descuenta del pedido si la importación se ejecuta.
            </p>
          </div>
        </div>
      </div>

      <CtaContacto
        titulo="¿Qué producto necesitas encontrar?"
        texto="Describe el producto, la referencia si la tienes, y la cantidad aproximada. Te devolvemos las 3 opciones con ficha técnica."
        textoBoton="Pedir búsqueda de producto"
      />
    </main>
  );
}
