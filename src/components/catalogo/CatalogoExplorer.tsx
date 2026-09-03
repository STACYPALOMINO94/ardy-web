"use client";

import { useMemo, useState } from "react";
import type { Producto } from "@/data/productos";
import type { Categoria } from "@/lib/productos";
import { ProductCard } from "@/components/home/ProductCard";

const DISPONIBILIDADES = ["En stock", "Bajo producción"] as const;

export function CatalogoExplorer({
  productos,
  categorias,
  categoriaInicial = "todas",
}: {
  productos: Producto[];
  categorias: Categoria[];
  categoriaInicial?: string;
}) {
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [disponibilidad, setDisponibilidad] = useState<"todas" | (typeof DISPONIBILIDADES)[number]>("todas");
  const [busqueda, setBusqueda] = useState("");

  const categoriaPorSlug = useMemo(() => {
    const mapa = new Map<string, string>();
    for (const c of categorias) mapa.set(c.slug, c.nombre);
    return mapa;
  }, [categorias]);

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      if (categoria !== "todas" && categoriaPorSlug.get(categoria) !== p.categoria) return false;
      if (disponibilidad !== "todas" && p.disponibilidad !== disponibilidad) return false;
      if (termino) {
        const haystack = `${p.nombre} ${p.descripcionCorta} ${p.categoria} ${p.palabraClave}`.toLowerCase();
        if (!haystack.includes(termino)) return false;
      }
      return true;
    });
  }, [productos, categoria, disponibilidad, busqueda, categoriaPorSlug]);

  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[0.76rem] text-gris font-bold min-w-[74px] tracking-[0.03em]">CATEGORÍA</span>
          <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
            Todas
          </Chip>
          {categorias.map((cat) => (
            <Chip key={cat.slug} activo={categoria === cat.slug} onClick={() => setCategoria(cat.slug)}>
              {cat.nombre} ({cat.cantidad})
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[0.76rem] text-gris font-bold min-w-[74px] tracking-[0.03em]">DISPONIBILIDAD</span>
          <Chip activo={disponibilidad === "todas"} onClick={() => setDisponibilidad("todas")}>
            Todas
          </Chip>
          {DISPONIBILIDADES.map((d) => (
            <Chip key={d} activo={disponibilidad === d} onClick={() => setDisponibilidad(d)}>
              {d}
            </Chip>
          ))}
        </div>
        <div className="pt-1">
          <label htmlFor="busqueda-catalogo" className="sr-only">
            Buscar producto
          </label>
          <input
            id="busqueda-catalogo"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, categoría o material…"
            className="w-full sm:w-[360px] px-3 py-2.5 border border-linea-2 bg-white text-[0.92rem]"
          />
        </div>
      </div>

      <p className="text-[0.83rem] text-gris mb-4">
        {filtrados.length} {filtrados.length === 1 ? "producto" : "productos"}
      </p>

      {filtrados.length === 0 ? (
        <p className="py-10 text-gris">
          Ningún producto con esos filtros. Prueba quitando uno, o pídenos la búsqueda de sourcing.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtrados.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`border px-3.5 py-1.5 text-[0.85rem] ${
        activo ? "bg-marino text-white border-marino" : "border-linea-2 text-marino bg-transparent hover:border-marino"
      }`}
    >
      {children}
    </button>
  );
}
