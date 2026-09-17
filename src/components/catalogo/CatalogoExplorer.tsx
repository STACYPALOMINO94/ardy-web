"use client";

import { useEffect, useMemo, useState } from "react";
import type { Producto } from "@/data/productos";
import type { Categoria } from "@/lib/productos";
import { getPrecioDesde } from "@/lib/productos";
import { TarjetaCatalogo } from "./TarjetaCatalogo";

const DISPONIBILIDADES = ["En stock", "Bajo producción"] as const;
/** Etiquetas públicas del diseño aprobado; el valor real de filtrado no cambia. */
const DISPONIBILIDAD_LABEL: Record<(typeof DISPONIBILIDADES)[number], string> = {
  "En stock": "Disponibilidad inmediata",
  "Bajo producción": "Bajo producción",
};
const POR_PAGINA = 8;

type Tab = "todos" | "tendencias" | "nuevos";
type Orden = "recientes" | "precio-asc" | "precio-desc" | "nombre";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "todos", label: "Todos los productos" },
  { id: "tendencias", label: "Tendencias" },
  { id: "nuevos", label: "Nuevos ingresos" },
];

const OPCIONES_ORDEN: Array<{ id: Orden; label: string }> = [
  { id: "recientes", label: "Más recientes" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "nombre", label: "Nombre A–Z" },
];

export function CatalogoExplorer({
  productos,
  categorias,
  categoriaInicial = "todas",
  ocultarFiltroCategoria = false,
}: {
  productos: Producto[];
  categorias: Categoria[];
  categoriaInicial?: string;
  /** En /categoria/[slug] el filtro de categoría es redundante: ya se está en esa categoría. */
  ocultarFiltroCategoria?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("todos");
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [disponibilidad, setDisponibilidad] = useState<"todas" | (typeof DISPONIBILIDADES)[number]>("todas");
  const [orden, setOrden] = useState<Orden>("recientes");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  // "q" en la URL viene de la barra de búsqueda del Home (/productos?q=...). Se
  // lee con window.location en un efecto (no useSearchParams) para que el grid
  // completo siga saliendo en el HTML estático del export — useSearchParams
  // fuerza a Next a solo prerenderizar el fallback de Suspense en build.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setBusqueda(q);
  }, []);

  useEffect(() => setPagina(1), [tab, categoria, disponibilidad, orden, busqueda]);

  const categoriasConProductos = useMemo(() => categorias.filter((c) => c.cantidad > 0), [categorias]);
  const categoriaPorSlug = useMemo(() => {
    const mapa = new Map<string, string>();
    for (const c of categorias) mapa.set(c.slug, c.nombre);
    return mapa;
  }, [categorias]);

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    let items = productos.filter((p) => {
      if (tab === "tendencias" && !p.destacado) return false;
      if (tab === "nuevos" && !p.esNovedad) return false;
      if (categoria !== "todas" && categoriaPorSlug.get(categoria) !== p.categoria) return false;
      if (disponibilidad !== "todas" && p.disponibilidad !== disponibilidad) return false;
      if (termino) {
        const haystack = `${p.nombre} ${p.descripcionCorta} ${p.categoria} ${p.palabraClave}`.toLowerCase();
        if (!haystack.includes(termino)) return false;
      }
      return true;
    });

    items = items.slice();
    if (orden === "precio-asc") {
      items.sort((a, b) => (getPrecioDesde(a) ?? Infinity) - (getPrecioDesde(b) ?? Infinity));
    } else if (orden === "precio-desc") {
      items.sort((a, b) => (getPrecioDesde(b) ?? -1) - (getPrecioDesde(a) ?? -1));
    } else if (orden === "nombre") {
      items.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      items.sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion));
    }
    return items;
  }, [productos, tab, categoria, disponibilidad, busqueda, orden, categoriaPorSlug]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const items = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  return (
    <div className="mx-auto max-w-[1240px] px-8">
      <section className="pt-12">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 items-stretch">
          <div className="flex-1 flex items-center gap-4 bg-white border border-linea-fuerte rounded-sm px-6 shadow-hairline">
            <label htmlFor="busqueda-catalogo" className="sr-only">
              Buscar producto
            </label>
            <input
              id="busqueda-catalogo"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Busca por producto, material o uso (ej. lapicero, botella térmica, mochila)"
              className="flex-1 border-none outline-none bg-transparent text-[16px] text-marino py-5"
            />
          </div>
          <button
            type="submit"
            className="min-w-[120px] px-[28px] py-[15px] rounded-sm bg-marino text-white font-semibold text-[16px] hover:bg-marino-press"
          >
            Buscar
          </button>
        </form>
      </section>

      <section className="pt-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-2 flex-wrap">
            {TABS.map((t) => (
              <ChipTab key={t.id} activo={tab === t.id} onClick={() => setTab(t.id)}>
                {t.label}
              </ChipTab>
            ))}
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-[14px] text-gris">
              {filtrados.length} {filtrados.length === 1 ? "producto" : "productos"}
            </span>
            <select
              aria-label="Ordenar"
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="min-w-[200px] h-11 px-3 border border-linea-fuerte rounded-sm bg-white text-[0.88rem] text-marino"
            >
              {OPCIONES_ORDEN.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 py-6 border-t border-linea-soft flex items-center gap-12 flex-wrap">
          {!ocultarFiltroCategoria && (
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-gris">Categoría</span>
              <select
                aria-label="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="min-w-[220px] h-11 px-3 border border-linea-fuerte rounded-sm bg-white text-[0.88rem] text-marino"
              >
                <option value="todas">Todas las categorías</option>
                {categoriasConProductos.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-gris">Disponibilidad</span>
            <div className="flex gap-2">
              <ChipDisponibilidad activo={disponibilidad === "todas"} onClick={() => setDisponibilidad("todas")}>
                Todas
              </ChipDisponibilidad>
              {DISPONIBILIDADES.map((d) => (
                <ChipDisponibilidad key={d} activo={disponibilidad === d} onClick={() => setDisponibilidad(d)}>
                  {DISPONIBILIDAD_LABEL[d]}
                </ChipDisponibilidad>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-3 pb-24">
        {items.length === 0 ? (
          <p className="py-10 text-gris">
            Ningún producto con esos filtros. Prueba quitando uno, o pídenos la búsqueda de sourcing.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.map((p) => (
                <TarjetaCatalogo key={p.slug} producto={p} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <BotonPagina onClick={() => setPagina(Math.max(1, paginaActual - 1))}>«</BotonPagina>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <BotonPagina key={n} activo={n === paginaActual} onClick={() => setPagina(n)}>
                    {n}
                  </BotonPagina>
                ))}
                <BotonPagina onClick={() => setPagina(Math.min(totalPaginas, paginaActual + 1))}>»</BotonPagina>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function ChipTab({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`px-5 py-3 rounded-sm text-[15px] font-semibold ${
        activo ? "bg-marino text-white border border-marino" : "bg-white text-marino border border-linea-fuerte"
      }`}
    >
      {children}
    </button>
  );
}

function ChipDisponibilidad({
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
      className={`px-4 py-[9px] rounded-sm text-[14px] font-semibold ${
        activo ? "bg-marino text-white border border-marino" : "bg-white text-marino border border-linea-fuerte"
      }`}
    >
      {children}
    </button>
  );
}

function BotonPagina({
  activo = false,
  onClick,
  children,
}: {
  activo?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-current={activo}
      onClick={onClick}
      className={`min-w-10 h-10 px-3 rounded-sm text-[14px] font-semibold ${
        activo ? "bg-marino text-white border border-marino" : "bg-white text-marino border border-linea-fuerte"
      }`}
    >
      {children}
    </button>
  );
}
