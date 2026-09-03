import type { Metadata } from "next";
import Link from "next/link";
import { EN_BLANCO, GRABADO_DIAS } from "@/lib/plazos";
import { Proceso } from "@/components/home/Proceso";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Importación aérea de merchandising desde China",
  description:
    "Importamos merchandising por vía aérea desde China: 15 a 17 días hábiles puerta a puerta en blanco. Para proyectos con fecha que no esperan un contenedor.",
};

export default function ImportacionAereaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Importación aérea", url: "/importacion-aerea-merchandising" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[24ch]">Importación aérea de merchandising: la que llega a tiempo</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Un contenedor por vía marítima tarda cerca de dos meses en llegar a Lima. Cuando el evento tiene fecha
          fija, ese plazo no sirve. Importamos por avión: {EN_BLANCO.min} a {EN_BLANCO.max} días hábiles puerta a
          puerta con el producto en blanco, {EN_BLANCO.min + GRABADO_DIAS} a {EN_BLANCO.max + GRABADO_DIAS} si lo
          marcamos en Lima. El plazo corre desde el pago confirmado, no desde la primera conversación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="border border-linea p-6">
            <h2 className="mb-2">No vendemos precio, vendemos plazo</h2>
            <p className="text-[0.9rem] text-gris">
              El costo de un producto importado por avión es más alto que por barco. Lo que compras al elegirnos no
              es el precio más bajo posible: es la certeza de que el pedido llega antes del evento, con margen para
              imprevistos de aduana.
            </p>
          </div>
          <div className="border border-linea p-6">
            <h2 className="mb-2">La cantidad casi no mueve el plazo</h2>
            <p className="text-[0.9rem] text-gris">
              Entre 100 y 1000 unidades, el tiempo de entrega prácticamente no cambia: lo que ocupa tiempo es el
              vuelo y la nacionalización, no el volumen del pedido. Si el producto está bajo producción (sin stock
              en fábrica), se suman los días de fabricación según el proveedor.
            </p>
          </div>
        </div>
      </div>

      <Proceso />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 24 }}>
        <p className="text-[0.85rem] text-gris">
          ¿Buscas el catálogo completo?{" "}
          <Link href="/productos" className="text-marino font-semibold hover:underline">
            Ver productos disponibles
          </Link>
          .
        </p>
      </div>

      <div style={{ marginTop: 40 }}>
        <CtaContacto
          titulo="¿Tienes una fecha límite?"
          texto="Cuéntanos el proyecto y te respondemos con la fecha exacta en la que debe estar confirmado el pedido para llegar a tiempo."
        />
      </div>
    </main>
  );
}
