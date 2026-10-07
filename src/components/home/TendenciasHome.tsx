import Link from "next/link";
import { getNuevos } from "@/lib/productos";

/**
 * Sección "Tendencias": grilla estática de 4 productos (no carrusel), solo foto
 * + título, sin precio ni botones.
 *
 * La selección usa el criterio editorial existente `esNovedad` y conserva el
 * orden determinista del catálogo publicado.
 */
export function TendenciasHome() {
  const tendencias = getNuevos()
    .filter((p) => p.nombre.trim() && p.descripcionCorta.trim() && p.fotos[0]?.url && p.fotos[0]?.alt)
    .slice(0, 4);

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
          {tendencias.map((p) => (
            <Link
              key={p.slug}
              href={`/productos/${p.slug}`}
              className="bg-white border border-[#F0EDE5] rounded-2xl shadow-[0_2px_14px_rgba(22,40,60,.04)] hover:shadow-card-hover transition-shadow p-5 text-center"
            >
              <div className="w-full h-[200px] rounded-[10px] overflow-hidden bg-fog">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.fotos[0].url} alt={p.fotos[0].alt} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <span className="block w-[34px] h-0.5 bg-ambar mx-auto mt-5 mb-3.5" />
              <h3 className="text-marino text-[15.5px] font-bold leading-snug">{p.nombre}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
