"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Producto } from "@/data/productos";
import { datoValido, formatPrecio, getPrecioDesde, getProductosPorCategoriaSlug, toSlug } from "@/lib/productos";
import { getColorHex } from "@/lib/colores";
import { EN_BLANCO } from "@/lib/plazos";
import { construirLinkWhatsApp } from "@/lib/config";
import { GaleriaProducto } from "./GaleriaProducto";
import { IconoCategoria } from "@/components/home/IconoCategoria";

const CANTIDADES = [100, 300, 500, 1000] as const;

function formatearTecnica(t: string): string {
  const s = t.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function FichaProducto({ producto }: { producto: Producto }) {
  const [color, setColor] = useState(producto.colores[0] ?? "");
  const [presentacion, setPresentacion] = useState(producto.presentaciones?.[0] ?? "");
  const [mostrarPrecios, setMostrarPrecios] = useState(false);

  const cantidadesDisponibles = CANTIDADES.filter((c) => c >= producto.moq && producto.precios[c] > 0);
  const hayPrecio = cantidadesDisponibles.length > 0;
  const precioDesde = getPrecioDesde(producto);
  const [cantidad, setCantidad] = useState<number>(cantidadesDisponibles[0] ?? producto.moq);

  const precioUnitario = hayPrecio ? producto.precios[cantidad as (typeof CANTIDADES)[number]] : 0;
  const precioTotal = precioUnitario * cantidad;

  const bajoProduccion = producto.disponibilidad === "Bajo producción";

  const mensajeWhatsApp = useMemo(() => {
    const partes = [`Hola, quiero cotizar: ${producto.nombre}.`];
    if (hayPrecio) {
      partes.push(
        `Cantidad: ${cantidad} unidades (S/ ${precioUnitario.toFixed(2)} c/u, total ${formatPrecio(precioTotal)}).`
      );
    } else {
      partes.push(`Cantidad estimada: ${cantidad} unidades. Necesito precio, el catálogo no lo tiene cargado aún.`);
    }
    if (color) partes.push(`Color: ${color}.`);
    if (presentacion) partes.push(`Presentación: ${presentacion}.`);
    return partes.join(" ");
  }, [producto.nombre, cantidad, precioUnitario, precioTotal, hayPrecio, color, presentacion]);

  const mensajeInfo = `Hola, quiero más información sobre: ${producto.nombre}.`;

  const categoriaSlug = toSlug(producto.categoria);
  const relacionados = getProductosPorCategoriaSlug(categoriaSlug)
    .filter((p) => p.slug !== producto.slug)
    .slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-start">
        <GaleriaProducto producto={producto} />

        <div className="flex flex-col gap-4 max-w-[520px]">
          <p className="text-[0.75rem] text-oliva font-bold tracking-[0.14em] uppercase">{producto.categoria}</p>
          <h1 className="text-marino text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.015em]">
            {producto.nombre}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {producto.esNovedad && <Insignia tono="ambar">Nuevo</Insignia>}
            {bajoProduccion && <Insignia tono="oliva">Bajo producción</Insignia>}
          </div>

          <p className="text-[0.95rem] text-gris leading-relaxed">{producto.descripcionLarga}</p>

          <div className="h-px bg-linea-soft my-1" />

          {producto.colores.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[15px] font-semibold text-marino">Color:</span>
              <div className="flex flex-wrap gap-2.5">
                {producto.colores.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={c}
                    title={c}
                    onClick={() => setColor(c)}
                    className="w-[30px] h-[30px] rounded-full border border-[rgba(22,40,60,.14)]"
                    style={{
                      background: getColorHex(c),
                      boxShadow: c === color ? "0 0 0 2px #fff, 0 0 0 3px var(--color-ambar)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {producto.presentaciones && producto.presentaciones.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[15px] font-semibold text-marino">Presentación:</span>
              <div className="flex flex-wrap gap-2">
                {producto.presentaciones.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPresentacion(p)}
                    className={`h-10 px-4 rounded-sm text-[15px] font-semibold border ${
                      p === presentacion ? "bg-marino text-white border-marino" : "bg-white text-marino border-linea-2"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-1">
            <span className="text-[15px] font-semibold text-marino">Cantidad mínima de compra:</span>
            {hayPrecio ? (
              <div className="grid grid-cols-4 gap-3">
                {cantidadesDisponibles.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={c === cantidad}
                    onClick={() => setCantidad(c)}
                    className={`h-12 rounded-sm text-[15px] font-bold border ${
                      c === cantidad ? "bg-marino text-white border-marino" : "bg-white text-marino border-linea-2"
                    }`}
                  >
                    {c.toLocaleString("es-PE")}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[15px] text-marino font-semibold">
                Mínimo {producto.moq} unidades. Precio a confirmar por proyecto.
              </p>
            )}
            <span className="text-[0.82rem] text-gris">Puedes combinar colores según disponibilidad.</span>
          </div>

          {precioDesde !== null && (
            <div className="flex flex-col gap-2 py-4 border-t border-linea-soft">
              <span className="text-marino text-[1.35rem] font-extrabold tracking-[-0.01em]">
                Desde {formatPrecio(precioDesde)} <span className="text-[0.9rem] font-normal text-gris">/ unidad</span>
              </span>
              {cantidadesDisponibles.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMostrarPrecios((v) => !v)}
                  aria-expanded={mostrarPrecios}
                  className="self-start text-[0.82rem] font-semibold text-ambar-accent hover:underline"
                >
                  {mostrarPrecios ? "Ocultar precios −" : "Ver precios por cantidad +"}
                </button>
              )}
              {mostrarPrecios && cantidadesDisponibles.length > 1 && (
                <div className="flex flex-col mt-1">
                  {cantidadesDisponibles.map((c) => (
                    <div key={c} className="flex justify-between gap-4 py-2 border-b border-linea-soft text-[15px]">
                      <span className="text-gris">
                        {c === cantidadesDisponibles[cantidadesDisponibles.length - 1]
                          ? `Desde ${c.toLocaleString("es-PE")} unidades`
                          : `${c.toLocaleString("es-PE")} unidades`}
                      </span>
                      <span className="font-semibold text-marino">{formatPrecio(producto.precios[c])}</span>
                    </div>
                  ))}
                </div>
              )}
              <span className="text-[0.8rem] text-gris">
                Precio referencial sin IGV según cantidad y personalización.
              </span>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            <a
              href={construirLinkWhatsApp(mensajeWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-14 rounded-sm bg-ambar text-white font-bold text-[17px] hover:bg-ambar-accent"
            >
              Cotizar por WhatsApp
            </a>
            <a
              href={construirLinkWhatsApp(mensajeInfo)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-14 rounded-sm bg-white text-marino font-semibold text-[17px] border border-marino hover:bg-marino-06"
            >
              Solicitar más información
            </a>
          </div>

          <div className="grid grid-cols-3 gap-5 pt-5 mt-1 border-t border-linea-soft">
            <BeneficioServicio titulo="Importación aérea" sub={`${EN_BLANCO.min} – ${EN_BLANCO.max} días hábiles`} />
            <BeneficioServicio titulo="Personalización" sub="A tu medida" />
            <BeneficioServicio titulo="Acompañamiento" sub="En todo el proceso" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-linea-soft mt-9">
        <a href="#descripcion" className="pb-3.5 text-[16px] font-bold text-marino border-b-2 border-marino -mb-px">
          Descripción
        </a>
        <a href="#especificaciones" className="pb-3.5 text-[16px] font-semibold text-gris">
          Especificaciones
        </a>
      </div>

      <section id="descripcion" className="grid grid-cols-1 md:grid-cols-2 gap-9 items-start py-9 border-b border-linea-soft">
        <div className="flex flex-col gap-4">
          <h2 className="text-marino">Descripción del producto</h2>
          <p className="text-gris leading-relaxed max-w-[640px]">{producto.descripcionLarga}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {datoValido(producto.material) && <DatoRapido titulo="Material" valor={producto.material} />}
          <DatoRapido titulo="Cantidad mínima" valor={`${producto.moq} unidades`} />
          {datoValido(producto.areaMarcado) && (
            <DatoRapido titulo="Área de marcado" valor={`${producto.areaMarcado} cm`} />
          )}
        </div>
      </section>

      <section id="especificaciones" className="flex flex-col gap-6 py-9 border-b border-linea-soft">
        <h2 className="text-marino">Especificaciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {datoValido(producto.material) && <FilaEspec label="Material" valor={producto.material} />}
          <FilaEspec label="Cantidad mínima" valor={`${producto.moq} unidades`} />
          {producto.colores.length > 0 && <FilaEspec label="Colores" valor={producto.colores.join(", ")} />}
          {producto.tecnicas.length > 0 && (
            <FilaEspec label="Técnica de marcado" valor={producto.tecnicas.map(formatearTecnica).join(", ")} />
          )}
          {datoValido(producto.areaMarcado) && (
            <FilaEspec label="Área de marcado" valor={`${producto.areaMarcado} cm`} />
          )}
          {producto.presentaciones && producto.presentaciones.length > 0 && (
            <FilaEspec label="Presentación" valor={producto.presentaciones.join(" · ")} />
          )}
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="flex flex-col gap-6 py-9">
          <div className="flex flex-wrap gap-4 items-baseline justify-between">
            <h2 className="text-marino">Productos relacionados</h2>
            <Link href={`/categoria/${categoriaSlug}`} className="text-[14px] font-semibold text-ambar-accent">
              Ver más en {producto.categoria} →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {relacionados.map((r) => (
              <Link
                key={r.slug}
                href={`/productos/${r.slug}`}
                className="bg-white border border-linea-soft rounded-md shadow-hairline hover:shadow-card-hover transition-shadow overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-fog flex items-center justify-center p-4">
                  {r.fotos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.fotos[0].url}
                      alt={r.fotos[0].alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <IconoCategoria categoria={r.categoria} color="var(--color-marino-40)" className="w-[60%] h-[60%]" />
                  )}
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <span className="text-marino text-[15px] font-bold leading-snug">{r.nombre}</span>
                  {r.esNovedad && <Insignia tono="neutral">Nuevo</Insignia>}
                  <span className="mt-auto flex items-center justify-center h-10 rounded-sm border border-ambar text-ambar-accent text-[14px] font-semibold hover:bg-ambar hover:text-white">
                    Ver producto
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-sand rounded-lg mt-2 mb-9 px-6 md:px-9 py-9 flex flex-wrap items-center justify-between gap-7">
        <div className="flex flex-col gap-3 max-w-[560px]">
          <h2 className="text-marino">¿Tienes un proyecto?</h2>
          <p className="text-gris">Cuéntanos qué necesitas y te ayudamos a definir la mejor alternativa.</p>
        </div>
        <a
          href={construirLinkWhatsApp(mensajeInfo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-14 px-7 rounded-sm bg-ambar text-white font-bold text-[17px] hover:bg-ambar-accent"
        >
          Cotizar por WhatsApp
        </a>
      </section>
    </div>
  );
}

function Insignia({ tono, children }: { tono: "ambar" | "alerta" | "oliva" | "neutral"; children: React.ReactNode }) {
  const clases: Record<string, string> = {
    ambar: "bg-ambar text-white",
    alerta: "bg-alerta text-white",
    oliva: "bg-oliva text-white",
    neutral: "bg-marino-06 text-marino",
  };
  return (
    <span className={`inline-block w-fit text-[0.7rem] px-2.5 py-1 font-bold tracking-[0.04em] rounded-sm ${clases[tono]}`}>
      {children}
    </span>
  );
}

function BeneficioServicio({ titulo, sub }: { titulo: string; sub: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-marino text-[15px] font-semibold">{titulo}</span>
      <span className="text-[0.82rem] text-gris">{sub}</span>
    </div>
  );
}

function DatoRapido({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="bg-marino-06 border border-linea-soft rounded-md p-5 flex flex-col gap-1">
      <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-oliva">{titulo}</span>
      <span className="text-marino text-[16px] font-semibold">{valor}</span>
    </div>
  );
}

function FilaEspec({ label, valor }: { label: string; valor: string }) {
  if (!valor) return null;
  return (
    <div className="flex justify-between gap-4 py-3 border-b border-linea-soft">
      <span className="text-gris text-[15px]">{label}</span>
      <span className="text-marino font-semibold text-[15px] text-right">{valor}</span>
    </div>
  );
}
