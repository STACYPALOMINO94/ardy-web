import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { SolucionesTabs } from "@/components/paginas/SolucionesTabs";

export const metadata: Metadata = {
  title: "Soluciones corporativas de merchandising",
  description:
    "Merchandising que impulsa tu marca: eventos y activaciones, regalos corporativos, merch para empresas, retail y promociones, y proyectos especiales de sourcing.",
};

const BENEFICIOS = [
  { titulo: "Importación aérea más rápida", texto: "Soluciones en el tiempo que necesitas." },
  { titulo: "Productos de calidad y personalizables", texto: "Opciones para cada tipo de proyecto." },
  { titulo: "Asesoría especializada en todo el proceso", texto: "Te guiamos desde la idea hasta la entrega." },
  { titulo: "Desde 1 unidad o grandes volúmenes", texto: "Nos adaptamos a la escala de tu proyecto." },
];

export default function SolucionesCorporativasPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Soluciones corporativas", url: "/soluciones-corporativas" },
        ])}
      />

      <section className="pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-[1240px] px-8">
          <span className="block text-[12px] font-bold uppercase tracking-[.14em] leading-[1.2] text-oliva mb-4">
            Soluciones corporativas
          </span>
          <h1 className="text-marino max-w-[760px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.02em]">
            Merchandising que impulsa tu marca
          </h1>
          <p className="text-gris text-[18px] leading-[1.65] max-w-[560px] mt-6 text-pretty">
            Soluciones a medida para cada proyecto, desde una idea hasta la entrega en Perú.
          </p>
        </div>
      </section>

      <SolucionesTabs />

      {/*
        Franja de video full-bleed: por ahora se ve el poster de referencia
        entregado en el handoff. Cuando llegue el MP4 final del evento (~3s,
        loop) basta con añadir <source src="..." type="video/mp4" /> dentro
        del <video>.
      */}
      <section className="bg-marino">
        <video
          poster="/img/soluciones-corporativas/video-evento.png"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          aria-label="Activación de marca en evento corporativo"
          className="block w-full h-[257px] object-cover"
        />
      </section>

      <section className="py-16 border-b border-linea-soft">
        <div className="mx-auto max-w-[1240px] px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFICIOS.map((b, i) => (
            <div
              key={b.titulo}
              className={`${i > 0 ? "lg:border-l border-linea-soft lg:pl-8" : ""} ${
                i < BENEFICIOS.length - 1 ? "lg:pr-6" : ""
              }`}
            >
              <h3 className="text-marino text-[18px] leading-[1.35] font-bold">{b.titulo}</h3>
              <p className="text-gris text-[14px] leading-[1.55] mt-[14px]">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
