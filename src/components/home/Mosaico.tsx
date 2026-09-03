import Link from "next/link";
import { getCategorias } from "@/lib/productos";
import { IconoCategoria } from "./IconoCategoria";

const CLASES_TILE = ["bg-marino", "bg-oliva", "bg-marino-2", "bg-oliva-2"];

export function Mosaico() {
  const categorias = getCategorias();

  const tiles = categorias.map((cat, i) => ({
    href: `/categoria/${cat.slug}`,
    titulo: cat.nombre,
    texto: `${cat.cantidad} ${cat.cantidad === 1 ? "modelo disponible" : "modelos disponibles"}.`,
    clase: CLASES_TILE[i % CLASES_TILE.length],
    grande: i === 0,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tiles.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`relative overflow-hidden p-6 min-h-[196px] flex flex-col justify-between text-white transition-transform hover:-translate-y-[3px] ${t.clase} ${
            t.grande ? "col-span-2" : ""
          }`}
        >
          <div>
            <h3 className="text-[1.15rem] text-white relative z-[2]">{t.titulo}</h3>
            <p className="text-[0.85rem] text-white/[.78] mt-1.5 relative z-[2] max-w-[26ch]">{t.texto}</p>
          </div>
          <span className="text-[0.83rem] font-bold text-ambar-2 relative z-[2] mt-3.5">Ver productos</span>
          <IconoCategoria
            categoria={t.titulo}
            color="#ffffff"
            sombra="rgba(0,0,0,.2)"
            className={`absolute -right-[18px] -bottom-[18px] opacity-20 z-[1] ${t.grande ? "w-[170px]" : "w-[130px]"}`}
          />
        </Link>
      ))}
      <Link
        href="/nuevos-modelos"
        className="relative overflow-hidden p-6 min-h-[196px] flex flex-col justify-between text-white transition-transform hover:-translate-y-[3px] bg-marino-2 col-span-2"
      >
        <div>
          <h3 className="text-[1.15rem] text-white relative z-[2]">Nuevos modelos</h3>
          <p className="text-[0.85rem] text-white/[.78] mt-1.5 relative z-[2] max-w-[26ch]">
            Lo que todavía no está en todos los catálogos de Lima.
          </p>
        </div>
        <span className="text-[0.83rem] font-bold text-ambar-2 relative z-[2] mt-3.5">Ver novedades</span>
        <IconoCategoria
          categoria="tecnologia"
          color="#ffffff"
          sombra="rgba(0,0,0,.2)"
          className="absolute -right-[18px] -bottom-[18px] opacity-20 z-[1] w-[170px]"
        />
      </Link>
    </div>
  );
}
