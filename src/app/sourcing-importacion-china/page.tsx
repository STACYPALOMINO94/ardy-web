import type { Metadata } from "next";
import { Fragment } from "react";
import { construirLinkWhatsApp } from "@/lib/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Sourcing de producto desde China",
  description:
    "¿No está en el catálogo? Envíanos una foto, referencia o descripción y buscamos opciones con proveedores en China para tu proyecto.",
};

const PASOS = [
  { n: "01", titulo: "Nos envías la referencia", texto: "Foto, enlace, muestra o descripción." },
  { n: "02", titulo: "Buscamos opciones", texto: "Evaluamos alternativas que se ajusten a tu proyecto." },
  { n: "03", titulo: "Te presentamos una propuesta", texto: "Opciones, cantidades y cotización para decidir." },
];

const FLUJO = [
  {
    foto: "/img/sourcing/referencia-1.png",
    alt: "Foto de referencia que envía el cliente",
    titulo: "Tu referencia",
    texto: "Nos envías una foto o idea.",
  },
  {
    foto: "/img/sourcing/referencia-2.png",
    alt: "Pantalla con opciones de producto encontradas",
    titulo: "Nuestra búsqueda",
    texto: "Evaluamos opciones con proveedores confiables.",
  },
  {
    foto: "/img/sourcing/referencia-3.png",
    alt: "Producto final personalizado encontrado para el cliente",
    titulo: "Producto encontrado",
    texto: "Te presentamos la mejor opción para tu proyecto.",
  },
];

export default function SourcingPage() {
  const mensajeHero = "Hola, quiero enviarles una referencia de un producto que busco para mi proyecto.";

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Sourcing", url: "/sourcing-importacion-china" },
        ])}
      />

      <section className="border-b border-linea-soft">
        <div className="mx-auto max-w-[1240px] px-8 lg:pr-0 grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-14 items-center lg:min-h-[520px]">
          <div className="flex flex-col gap-7 py-16 lg:py-24">
            <span className="text-[12px] font-bold uppercase tracking-[.14em] text-oliva">Sourcing</span>
            <h1 className="text-marino text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-extrabold tracking-[-0.02em]">
              Tú tienes la idea,
              <br />
              <span className="text-oliva">nosotros la hacemos posible.</span>
            </h1>
            <p className="text-gris text-[18px] leading-[1.65] max-w-[480px]">
              Envíanos una foto, referencia o descripción. Buscamos opciones en China para tu proyecto.
            </p>
            <div>
              <a
                href={construirLinkWhatsApp(mensajeHero)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-[18px] rounded-sm bg-ambar text-white font-semibold text-[17px] hover:bg-ambar-accent"
              >
                Enviar referencia por WhatsApp&nbsp;&nbsp;→
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-[18px] text-[14.5px] text-gris">
              <span>Respuesta rápida</span>
              <span className="text-linea-fuerte">|</span>
              <span>Atención personalizada</span>
              <span className="text-linea-fuerte">|</span>
              <span>Sin compromiso</span>
            </div>
          </div>
          <div className="relative self-stretch min-h-[320px] lg:min-h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/sourcing/hero.png"
              alt="Mano con celular mostrando un producto, junto al producto físico personalizado"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-8">
          <h2 className="text-marino text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold tracking-[-0.02em]">
            Así de simple.
          </h2>
          <p className="text-gris text-[19px] mt-3.5">En tres pasos te acercamos a la mejor opción.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 mt-16">
            {PASOS.map((p, i) => (
              <div
                key={p.n}
                className={`flex flex-col gap-[18px] ${
                  i === 0
                    ? "md:pr-12"
                    : i === PASOS.length - 1
                      ? "md:pl-12 md:border-l border-linea-soft"
                      : "md:px-12 md:border-l border-linea-soft"
                }`}
              >
                <div className="flex items-center gap-[18px]">
                  <span className="text-ambar font-extrabold text-[46px] tracking-[-0.02em]">{p.n}</span>
                  <span className="h-px w-9 bg-ambar" />
                </div>
                <h3 className="text-marino text-[19px] font-bold">{p.titulo}</h3>
                <p className="text-gris text-[16px] leading-[1.65]">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F3] py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-8">
          <h2 className="text-marino text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold tracking-[-0.02em]">
            De una referencia a un producto real.
          </h2>
          <p className="text-gris text-[19px] mt-3.5">Tu idea, nuestra búsqueda, una solución para tu proyecto.</p>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_56px_minmax(0,1fr)] items-start mt-14 gap-6 md:gap-0">
            {FLUJO.map((f, i) => (
              <Fragment key={f.foto}>
                <div className="flex flex-col gap-5">
                  <div className="aspect-[4/3] border border-linea-soft rounded-md overflow-hidden shadow-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.foto} alt={f.alt} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-marino text-[17px] font-bold">{f.titulo}</h3>
                    <p className="text-gris text-[15.5px] leading-[1.6] mt-2">{f.texto}</p>
                  </div>
                </div>
                {i < FLUJO.length - 1 && (
                  <div className="hidden md:flex justify-center pt-[110px] text-marino text-[26px]">→</div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
