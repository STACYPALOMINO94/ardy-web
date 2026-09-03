"use client";

import { useMemo, useState } from "react";
import type { Producto } from "@/data/productos";
import { formatPrecio } from "@/lib/productos";
import { getColorHex } from "@/lib/colores";
import { EN_BLANCO, GRABADO_DIAS, PRODUCCION_EXTRA_DIAS } from "@/lib/plazos";
import { construirLinkWhatsApp } from "@/lib/config";
import { useCotizacion } from "@/components/cotizacion/CotizacionContext";
import { GaleriaProducto } from "./GaleriaProducto";

const CANTIDADES = [100, 300, 500, 1000] as const;

function formatearTecnica(t: string): string {
  const s = t.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function FichaProducto({ producto }: { producto: Producto }) {
  const { estaEnCotizacion, agregar, quitar, items } = useCotizacion();
  const [color, setColor] = useState(producto.colores[0] ?? "");
  const [talla, setTalla] = useState(producto.tallas[0] ?? "");
  const [cantidad, setCantidad] = useState<(typeof CANTIDADES)[number]>(100);

  const enCotizacion = estaEnCotizacion(producto.slug);
  const cantidadEnCarrito = items[producto.slug]?.cantidad;

  const precioUnitario = producto.precios[cantidad];
  const precioTotal = precioUnitario * cantidad;

  const plazoBlanco = `${EN_BLANCO.min} a ${EN_BLANCO.max} días hábiles`;
  const plazoGrabado = `${EN_BLANCO.min + GRABADO_DIAS} a ${EN_BLANCO.max + GRABADO_DIAS} días hábiles`;

  const mensajeWhatsApp = useMemo(() => {
    const partes = [
      `Hola, quiero cotizar: ${producto.nombre}.`,
      `Cantidad: ${cantidad} unidades (S/ ${precioUnitario.toFixed(2)} c/u, total ${formatPrecio(precioTotal)}).`,
    ];
    if (color) partes.push(`Color: ${color}.`);
    if (talla) partes.push(`Talla: ${talla}.`);
    return partes.join(" ");
  }, [producto.nombre, cantidad, precioUnitario, precioTotal, color, talla]);

  function onAgregar() {
    agregar(producto.slug, cantidad);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
      <GaleriaProducto producto={producto} />

      <div>
        <p className="text-[0.75rem] text-ambar font-bold tracking-[0.05em] mb-1.5">
          {producto.categoria.toUpperCase()}
        </p>
        <h1 className="text-marino mb-3">{producto.nombre}</h1>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {producto.esNovedad && (
            <span className="text-[0.7rem] px-2.5 py-1 font-bold tracking-[0.04em] bg-ambar text-marino-3">
              Nuevo
            </span>
          )}
          {producto.permisoMtc && (
            <span className="text-[0.7rem] px-2.5 py-1 font-bold tracking-[0.04em] bg-alerta text-white">
              Permiso MTC
            </span>
          )}
          <span className="text-[0.7rem] px-2.5 py-1 font-bold tracking-[0.04em] bg-oliva text-white">
            {producto.disponibilidad}
          </span>
        </div>

        <p className="text-[0.92rem] text-gris mb-6 max-w-[60ch]">{producto.descripcionLarga}</p>

        {producto.colores.length > 0 && (
          <div className="mb-5">
            <p className="text-[0.78rem] text-gris font-semibold mb-2">Color: {color}</p>
            <div className="flex gap-2">
              {producto.colores.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Color ${c}`}
                  aria-pressed={c === color}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 border-white ${
                    c === color ? "shadow-[0_0_0_2px_var(--color-marino)]" : "shadow-[0_0_0_1px_var(--color-linea-2)]"
                  }`}
                  style={{ background: getColorHex(c) }}
                />
              ))}
            </div>
          </div>
        )}

        {producto.tallas.length > 0 && (
          <div className="mb-5">
            <p className="text-[0.78rem] text-gris font-semibold mb-2">Talla: {talla}</p>
            <div className="flex gap-2 flex-wrap">
              {producto.tallas.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={t === talla}
                  onClick={() => setTalla(t)}
                  className={`min-w-10 px-3 py-2 border text-[0.85rem] ${
                    t === talla ? "bg-marino text-white border-marino" : "border-linea-2 text-marino"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-2">
          <p className="text-[0.78rem] text-gris font-semibold mb-2">Cantidad</p>
          <div className="flex gap-2 flex-wrap">
            {CANTIDADES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === cantidad}
                onClick={() => setCantidad(c)}
                className={`px-4 py-2 border text-[0.85rem] font-semibold ${
                  c === cantidad ? "bg-marino text-white border-marino" : "border-linea-2 text-marino"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-[0.76rem] text-gris mt-1.5">
            La cantidad entre 100 y 1000 unidades casi no cambia el plazo de entrega.
          </p>
        </div>

        <div className="border-t border-linea py-4 mb-5 flex items-baseline justify-between">
          <span className="text-[0.85rem] text-gris">Precio a {cantidad} unidades</span>
          <span className="text-right">
            <span className="block text-[1.6rem] font-extrabold text-marino tracking-[-0.02em]">
              {formatPrecio(precioUnitario)}
              <span className="text-[0.9rem] font-normal text-gris"> / unidad</span>
            </span>
            <span className="block text-[0.82rem] text-gris">Total: {formatPrecio(precioTotal)}</span>
          </span>
        </div>

        <table className="w-full text-[0.85rem] border-t border-linea mb-6">
          <tbody>
            <Fila label="Cantidad mínima" valor={`${producto.moq} unidades`} />
            <Fila label="Material" valor={producto.material} />
            <Fila label="Área de marcado" valor={`${producto.areaMarcado} cm`} />
            <Fila label="Técnicas de marcado" valor={producto.tecnicas.map(formatearTecnica).join(", ")} />
            <Fila label="Plazo puerta a puerta, en blanco" valor={plazoBlanco} />
            <Fila label="Plazo puerta a puerta, con grabado en Lima" valor={plazoGrabado} />
            {producto.disponibilidad === "Bajo producción" && (
              <Fila
                label="Fabricación bajo producción"
                valor={`+${PRODUCCION_EXTRA_DIAS} días hábiles estimados (varía por proveedor)`}
              />
            )}
            <Fila
              label="Permiso de internamiento MTC"
              valor={producto.permisoMtc ? "Sí, incluido en el plazo" : "No requiere"}
            />
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onAgregar}
            className={`flex-1 px-6 py-3.5 text-[0.94rem] font-bold border ${
              enCotizacion
                ? "bg-oliva border-oliva text-white"
                : "border-marino text-marino bg-transparent hover:bg-marino hover:text-white"
            }`}
          >
            {enCotizacion ? `En tu cotización (${cantidadEnCarrito} uds) · actualizar` : "Agregar a mi cotización"}
          </button>
          {enCotizacion && (
            <button
              type="button"
              onClick={() => quitar(producto.slug)}
              className="px-4 py-3.5 text-[0.85rem] text-alerta"
            >
              Quitar
            </button>
          )}
        </div>
        <a
          href={construirLinkWhatsApp(mensajeWhatsApp)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-3 bg-ambar text-marino-3 px-6 py-3.5 text-[0.94rem] font-bold hover:bg-ambar-2"
        >
          Solicitar cotización por WhatsApp
        </a>
      </div>
    </div>
  );
}

function Fila({ label, valor }: { label: string; valor: string }) {
  return (
    <tr className="border-b border-linea">
      <th className="text-left py-2.5 text-gris font-normal w-1/2">{label}</th>
      <td className="text-right py-2.5 text-marino font-semibold">{valor}</td>
    </tr>
  );
}
