"use client";

import { useCotizacion } from "@/components/cotizacion/CotizacionContext";
import { getProductoPorSlug } from "@/lib/productos";

export function ListaCotizacion() {
  const { items, actualizarCantidad, quitar, cantidadItems } = useCotizacion();

  if (cantidadItems === 0) return null;

  return (
    <section className="bg-marino text-white py-10" id="lista" style={{ marginTop: 64 }}>
      <div className="mx-auto max-w-[1240px] px-5">
        <h2 className="text-white mb-4">Mi cotización</h2>
        <div>
          {Object.values(items).map((item) => {
            const producto = getProductoPorSlug(item.slug);
            if (!producto) return null;
            return (
              <div key={item.slug} className="flex items-center gap-3.5 py-2.5 border-b border-[#2B4463] text-[0.92rem]">
                <span className="flex-1">{producto.nombre}</span>
                <label className="sr-only" htmlFor={`q-${item.slug}`}>
                  Cantidad de {producto.nombre}
                </label>
                <input
                  id={`q-${item.slug}`}
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(item.slug, Number(e.target.value) || 1)}
                  className="w-[92px] px-2.5 py-1.5 border border-[#3C536B] bg-marino-3 text-white"
                />
                <button type="button" className="text-[#E8A99B] text-[0.84rem] px-1" onClick={() => quitar(item.slug)}>
                  Quitar
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-[0.85rem] text-[#93A3B4] mt-3.5">
          No es una compra. Es una solicitud de cotización con tu fecha.
        </p>
        <a
          href="#cotizar"
          className="inline-block bg-ambar text-marino-3 px-6 py-3 font-bold mt-4 text-[0.92rem]"
        >
          Continuar al formulario
        </a>
      </div>
    </section>
  );
}
