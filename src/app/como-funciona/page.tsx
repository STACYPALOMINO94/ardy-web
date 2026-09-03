import type { Metadata } from "next";
import { EN_BLANCO, GRABADO_DIAS, PRODUCCION_EXTRA_DIAS } from "@/lib/plazos";
import { Validador } from "@/components/home/Validador";
import { Proceso } from "@/components/home/Proceso";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Cómo funciona la importación aérea, paso a paso",
  description:
    "Del pago confirmado a la entrega en Lima: formato aprobado, almacén en China, vuelo, nacionalización y, si corresponde, grabado. Explicado paso a paso.",
};

const DETALLE_PASOS = [
  {
    n: "01",
    titulo: "Pago y formato aprobado",
    detalle: "3 días hábiles",
    texto:
      "El plazo empieza a correr desde acá, no desde la primera conversación. Con el pago confirmado, se aprueba el formato final del pedido con el proveedor en China.",
  },
  {
    n: "02",
    titulo: "Almacén en China",
    detalle: "3 días hábiles",
    texto: "El producto se prepara y consolida en almacén antes de subir al vuelo.",
  },
  {
    n: "03",
    titulo: "Vuelo",
    detalle: "10 días calendario",
    texto: "El tramo aéreo. Es la diferencia frente a un contenedor, que tarda cerca de dos meses puerta a puerta.",
  },
  {
    n: "04",
    titulo: "Nacionalización",
    detalle: "1 día en canal verde · 3 en canal rojo",
    texto:
      "El canal se asigna en aduana y no se puede elegir de antemano. Por eso el rango de plazo (15 a 17 días hábiles en blanco) contempla ambos escenarios.",
  },
  {
    n: "05",
    titulo: "Grabado y entrega",
    detalle: `${GRABADO_DIAS} días adicionales · solo con marcado`,
    texto:
      "Si el producto va en blanco, se entrega directo. Si se pidió marcado, se graba en Lima: el arte se aprueba mientras el producto está en vuelo, así que no se pierde tiempo esperando el diseño.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Cómo funciona", url: "/como-funciona" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">Cómo funciona la importación aérea, paso a paso</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Cinco pasos entre el pago confirmado y la entrega en Lima. En blanco: {EN_BLANCO.min} a {EN_BLANCO.max}{" "}
          días hábiles. Con grabado en Lima: {EN_BLANCO.min + GRABADO_DIAS} a {EN_BLANCO.max + GRABADO_DIAS}. Si el
          producto está bajo producción (sin stock en fábrica), se suman aproximadamente {PRODUCCION_EXTRA_DIAS}{" "}
          días hábiles de fabricación, variable según proveedor.
        </p>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-linea border border-linea">
          {DETALLE_PASOS.map((p) => (
            <div key={p.n} className="bg-crema-2 p-6">
              <span className="text-ambar font-extrabold text-[1.4rem] tracking-[-0.04em]">{p.n}</span>
              <h2 className="mt-1 mb-1 text-marino text-[1.05rem]">{p.titulo}</h2>
              <p className="text-[0.79rem] text-gris mb-2">{p.detalle}</p>
              <p className="text-[0.88rem] text-gris">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <Proceso />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 64 }}>
        <div className="border-b-2 border-marino pb-2.5 mb-2">
          <h2>¿Llegas a tiempo con tu fecha?</h2>
        </div>
      </div>
      <Validador />

      <div style={{ marginTop: 64 }}>
        <CtaContacto
          titulo="¿Quieres que lo revisemos juntos?"
          texto="Cuéntanos la fecha del evento y si necesitas marcado. Te confirmamos el plazo exacto para tu pedido."
        />
      </div>
    </main>
  );
}
