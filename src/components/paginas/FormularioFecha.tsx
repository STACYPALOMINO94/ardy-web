"use client";

import { useState, type FormEvent } from "react";
import { construirLinkWhatsApp } from "@/lib/config";

const TIPOS_PRODUCTO = [
  "Textiles y prendas",
  "Tecnología y accesorios",
  "Termos y drinkware",
  "Bolsos y mochilas",
  "Escritura y oficina",
  "Otro / no lo tengo definido",
];

/** Estilo de campo fiel al componente Input/Select del design system ARDY (_ds_bundle.js). */
const CAMPO =
  "w-full font-normal text-[16px] leading-[1.65] text-marino bg-white py-3 px-3.5 border border-linea-fuerte rounded-sm outline-none focus:border-marino focus:shadow-[0_0_0_3px_rgba(184,132,42,.28)]";
const ETIQUETA = "block font-semibold text-[14px] leading-[1.4] text-marino mb-1.5";

export function FormularioFecha() {
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantidad, setCantidad] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const partes = ["Hola, quiero revisar si llego a tiempo con mi fecha."];
    if (fecha) partes.push(`Fecha del evento: ${fecha}.`);
    if (tipo) partes.push(`Tipo de producto: ${tipo}.`);
    if (cantidad) partes.push(`Cantidad estimada: ${cantidad} unidades.`);
    window.open(construirLinkWhatsApp(partes.join(" ")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end">
      <div>
        <label htmlFor="ff-fecha" className={ETIQUETA}>
          Fecha del evento
        </label>
        <input id="ff-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={CAMPO} />
      </div>
      <div>
        <label htmlFor="ff-tipo" className={ETIQUETA}>
          Tipo de producto
        </label>
        <select id="ff-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className={CAMPO}>
          <option value="">Selecciona una opción</option>
          {TIPOS_PRODUCTO.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ff-cantidad" className={ETIQUETA}>
          Cantidad estimada
        </label>
        <input
          id="ff-cantidad"
          type="number"
          min={1}
          placeholder="Ej. 500"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className={CAMPO}
        />
      </div>
      <button
        type="submit"
        className="h-[50px] px-7 rounded-sm bg-ambar text-white font-semibold text-[16px] hover:bg-ambar-accent whitespace-nowrap"
      >
        Revisar por WhatsApp →
      </button>
    </form>
  );
}
