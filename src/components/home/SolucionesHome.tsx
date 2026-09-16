import Link from "next/link";

/**
 * "Soluciones para cada necesidad": estructura fiel al handoff
 * (Home ARDY Import.dc.html, sección #soluciones): imagen arriba, luego
 * número + título + texto + botón debajo, cada tarjeta independiente (sin
 * alineación de filas entre columnas).
 *
 * Las 3 fotos son los assets aprobados (image-slots ardy-sol-1..3, exportados
 * a public/img/home/sol-<slug>.webp) y van con object-cover, igual que el fit
 * por defecto de <image-slot>.
 */
const SOLUCIONES = [
  {
    slug: "agencias-eventos",
    numero: "1.",
    titulo: "Agencias y eventos",
    texto: "Productos para activaciones, ferias y campañas que necesitan tiempos de respuesta rápidos.",
    href: "/soluciones-corporativas",
    imagen: "/img/home/sol-agencias-eventos.webp",
    alt: "Kit para activaciones",
  },
  {
    slug: "empresas",
    numero: "2.",
    titulo: "Empresas",
    texto: "Merch corporativo, regalos y kits que representan la identidad de tu marca.",
    href: "/soluciones-corporativas",
    imagen: "/img/home/sol-empresas.webp",
    alt: "Caja corporativa ARDY",
  },
  {
    slug: "sourcing-personalizado",
    numero: "3.",
    titulo: "Sourcing personalizado",
    texto: "¿No encuentras lo que buscas? Lo buscamos por ti con nuestros proveedores en China.",
    href: "/sourcing-importacion-china",
    imagen: "/img/home/sol-sourcing-personalizado.webp",
    alt: "Cajas y logística de importación",
  },
];

export function SolucionesHome() {
  return (
    <section id="soluciones" style={{ padding: "0 0 clamp(56px,7vw,88px)" }}>
      <div className="max-w-[1240px] mx-auto" style={{ padding: "0 clamp(20px,4vw,60px)" }}>
        <div className="text-center mb-12">
          <h2 className="text-marino font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>
            Soluciones para cada necesidad
          </h2>
          <p className="text-gris text-[17px] mt-3.5">Ideas que impulsan tu proyecto, desde el primer momento.</p>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,4vw,44px)" }}
        >
          {SOLUCIONES.map((s) => {
            return (
              <div key={s.slug}>
                <div
                  className="rounded-[14px] overflow-hidden bg-[#FBFAF7]"
                  style={{ height: "clamp(220px,20vw,280px)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.imagen} alt={s.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-[18px] items-start mt-[26px]">
                  <span className="text-[52px] font-extrabold leading-[.85] text-ambar shrink-0">{s.numero}</span>
                  <div>
                    <h3 className="text-marino text-[19px] font-bold mb-2">{s.titulo}</h3>
                    <p className="text-gris text-[14.5px] leading-relaxed text-pretty">{s.texto}</p>
                    <Link
                      href={s.href}
                      className="inline-block mt-[18px] text-[13px] font-bold tracking-[0.08em] text-marino border border-marino rounded-[8px] px-[22px] py-[11px] hover:bg-marino hover:text-white"
                    >
                      VER MÁS →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
