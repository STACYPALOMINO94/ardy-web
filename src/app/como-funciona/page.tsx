import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { FormularioFecha } from "@/components/paginas/FormularioFecha";

export const metadata: Metadata = {
  title: "Cómo funciona la importación de merchandising",
  description:
    "De tu idea a tus manos: cuéntanos la fecha de tu evento y te ayudamos a encontrar la mejor opción, aérea o marítima, con nuestro proceso paso a paso.",
};

const MODALIDADES = [
  {
    foto: "/img/como-funciona/aerea.png",
    alt: "Conjunto de productos pequeños: audífonos, power bank, lapiceros, USB",
    titulo: "Importación aérea",
    texto: "Ideal para productos urgentes, de menor tamaño y alto valor.",
    puntos: [
      "Productos urgentes",
      "Productos pequeños y de alto valor",
      "Ideal para eventos, activaciones y lanzamientos",
      "Llegas a tiempo para tu proyecto",
    ],
  },
  {
    foto: "/img/como-funciona/maritima.png",
    alt: "Conjunto de productos voluminosos: mochilas, tote bags, polos, gorras",
    titulo: "Importación marítima",
    texto: "La mejor opción para productos voluminosos y grandes cantidades.",
    puntos: [
      "Productos voluminosos",
      "Pedidos de gran cantidad",
      "Menor costo por unidad",
      "Ideal para campañas masivas y abastecimiento corporativo",
    ],
  },
];

const PROCESO = [
  { n: "01", titulo: "Pago y formato aprobado", texto: "Nos confirmas el producto y aprobamos los detalles." },
  { n: "02", titulo: "Almacén en China", texto: "Tu pedido se prepara en fábrica." },
  { n: "03", titulo: "Vuelo o transporte marítimo", texto: "Traslado internacional según la opción elegida." },
  { n: "04", titulo: "Nacionalización", texto: "Ingreso al país y trámites aduaneros." },
  { n: "05", titulo: "Grabado y entrega", texto: "Personalización (si aplica) y entrega en tu dirección." },
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

      <section className="mx-auto max-w-[1240px] px-8 pt-20 pb-[72px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 items-center">
        <div className="flex flex-col gap-6 min-w-0">
          <span className="text-[12px] leading-none font-bold uppercase tracking-[.14em] text-oliva">Cómo funciona</span>
          <h1 className="text-marino text-balance text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] font-bold tracking-[-0.02em]">
            Tu proyecto,
            <br />
            en las <span className="text-ambar">mejores manos.</span>
          </h1>
          <p className="text-gris text-[18px] leading-[1.65] max-w-[460px] text-pretty">
            Cuéntanos la fecha de tu evento y te ayudamos a encontrar la mejor opción.
          </p>
          <span className="w-14 h-px bg-ambar mt-2" />
          <div className="flex flex-wrap items-center gap-5 text-[14px] leading-[1.55] text-gris">
            <span>Respuesta rápida</span>
            <span className="w-px h-3.5 bg-linea-fuerte" />
            <span>Asesoría personalizada</span>
            <span className="w-px h-3.5 bg-linea-fuerte" />
            <span>Soluciones a tu medida</span>
          </div>
        </div>
        <div className="relative w-full aspect-[4/3] min-w-0 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/como-funciona/hero.png"
            alt="Fotografía editorial de productos corporativos personalizados"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-8 pb-24">
        <div className="bg-[#FAF8F3] border border-linea-soft rounded-md p-12">
          <h2 className="text-marino text-[24px] leading-[1.3] font-bold tracking-[-0.015em]">
            ¿Llegas a tiempo con tu fecha?
          </h2>
          <p className="text-gris text-[18px] leading-[1.65] mt-2 mb-8">Tenemos la solución para tu proyecto.</p>
          <FormularioFecha />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-8 pb-24">
        <h2 className="text-marino text-[36px] leading-[1.15] font-bold tracking-[-0.02em]">
          Importación para cada tipo de producto
        </h2>
        <p className="text-gris text-[18px] leading-[1.65] mt-3 mb-10 max-w-[640px]">
          Te asesoramos para elegir la mejor opción según tu producto, cantidad y plazo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MODALIDADES.map((m) => (
            <article
              key={m.foto}
              className="bg-white border border-linea-soft rounded-md shadow-card p-10 flex flex-col gap-7 min-w-0"
            >
              <div>
                <h3 className="text-marino text-[20px] leading-[1.3] font-semibold tracking-[-0.015em]">{m.titulo}</h3>
                <p className="text-gris text-[16px] leading-[1.65] mt-2.5 max-w-[420px]">{m.texto}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 items-center">
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.foto} alt={m.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
                  {m.puntos.map((p) => (
                    <li key={p} className="flex gap-3 items-start">
                      <span className="shrink-0 w-[5px] h-[5px] rounded-full bg-ambar mt-[9px]" />
                      <span className="text-gris text-[16px] leading-[1.65]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#FAF8F3] border-t border-linea-soft py-24">
        <div className="mx-auto max-w-[1240px] px-8">
          <h2 className="text-marino text-[36px] leading-[1.15] font-bold tracking-[-0.02em]">Nuestro proceso</h2>
          <p className="text-gris text-[18px] leading-[1.65] mt-3 mb-14 max-w-[640px]">
            De tu idea a tus manos, en pasos claros.
          </p>
          <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {PROCESO.map((p) => (
              <li key={p.n} className="border-t border-linea-fuerte pt-5 flex flex-col gap-2.5 min-w-0">
                <span className="text-ambar font-extrabold text-[28px] leading-none tracking-[-0.01em]">{p.n}</span>
                <span className="text-marino font-bold text-[17px] leading-[1.35]">{p.titulo}</span>
                <span className="text-gris text-[14px] leading-[1.6]">{p.texto}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
