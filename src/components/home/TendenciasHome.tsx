import Link from "next/link";

/**
 * Sección "Tendencias": grilla estática de 4 productos (no carrusel), solo foto
 * + título, sin precio ni botones.
 *
 * Los 4 ítems son FIJOS y vienen del Home aprobado (image-slots ardy-tend-1..4
 * y sus títulos): no se derivan del catálogo ni de esNovedad, porque el diseño
 * fija tanto la foto como el texto de cada tarjeta. Las fotos están en
 * public/img/home/tend-N.webp y van con object-cover, igual que el fit por
 * defecto de <image-slot> en el handoff.
 */
const TENDENCIAS = [
  {
    titulo: "Audífonos con estuche de bambú",
    imagen: "/img/home/tend-1.webp",
    href: "/productos",
  },
  {
    titulo: "Lapicero punta pluma Estilográfica",
    imagen: "/img/home/tend-2.webp",
    href: "/productos",
  },
  {
    titulo: "Taza Mug de Porcelana",
    imagen: "/img/home/tend-3.webp",
    href: "/productos",
  },
  {
    titulo: "Power Bank Fibra de Trigo de 5000 mAh",
    imagen: "/img/home/tend-4.webp",
    href: "/productos/power-bank-fibra-de-trigo-5000-mah",
  },
];

export function TendenciasHome() {
  return (
    <section id="tendencias" className="bg-sand" style={{ padding: "clamp(56px,7vw,88px) 0" }}>
      <div className="max-w-[1240px] mx-auto" style={{ padding: "0 clamp(20px,4vw,60px)" }}>
        <div className="text-center mb-11">
          <h2 className="text-marino font-extrabold tracking-[.06em]" style={{ fontSize: "clamp(26px,3vw,38px)" }}>
            Tendencias
          </h2>
          <span className="block w-14 h-0.5 bg-ambar mx-auto mt-4" />
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
          {TENDENCIAS.map((t) => (
            <Link
              key={t.titulo}
              href={t.href}
              className="bg-white border border-[#F0EDE5] rounded-2xl shadow-[0_2px_14px_rgba(22,40,60,.04)] hover:shadow-card-hover transition-shadow p-5 text-center"
            >
              <div className="w-full h-[200px] rounded-[10px] overflow-hidden bg-fog">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.imagen} alt={t.titulo} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <span className="block w-[34px] h-0.5 bg-ambar mx-auto mt-5 mb-3.5" />
              <h3 className="text-marino text-[15.5px] font-bold leading-snug">{t.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
