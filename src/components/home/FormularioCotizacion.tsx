"use client";

import { useState, type FormEvent } from "react";
import { useCotizacion } from "@/components/cotizacion/CotizacionContext";
import { construirLinkWhatsApp } from "@/lib/config";

export function FormularioCotizacion() {
  const { resumenTexto } = useCotizacion();
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "err"; texto: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = new FormData(form);
    const requeridos = ["fecha", "presupuesto", "aprueba", "cantidad", "empresa", "contacto"];
    const faltante = requeridos.find((campo) => !String(datos.get(campo) ?? "").trim());
    if (faltante) {
      setMensaje({ tipo: "err", texto: "Faltan datos por completar." });
      form.querySelector<HTMLElement>(`[name="${faltante}"]`)?.focus();
      return;
    }

    const detalle = String(datos.get("detalle") ?? "").trim() || resumenTexto();
    const partes = [
      "Hola, quiero cotizar un proyecto con ARDY Import.",
      `Fecha del evento: ${datos.get("fecha")}`,
      `Presupuesto: ${datos.get("presupuesto")}`,
      `Quién aprueba la OC: ${datos.get("aprueba")}`,
      `Cantidad: ${datos.get("cantidad")}`,
      `Empresa: ${datos.get("empresa")}`,
      `Contacto: ${datos.get("contacto")}`,
    ];
    if (detalle) partes.push(`Productos:\n${detalle}`);

    setMensaje({ tipo: "ok", texto: "Formulario validado. Te llevamos a WhatsApp para enviarlo." });
    window.open(construirLinkWhatsApp(partes.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="mx-auto max-w-[1240px] px-5" id="cotizar" style={{ paddingTop: 64 }}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h2>Cuéntanos el proyecto</h2>
        <span className="text-[0.87rem] text-gris">Respondemos con fecha límite de confirmación</span>
      </div>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5" onSubmit={onSubmit}>
        <Campo id="fecha" label="Fecha del evento" type="date" />
        <div>
          <label htmlFor="presupuesto" className="block text-[0.78rem] text-gris mb-1.5 font-semibold">
            Presupuesto
          </label>
          <select
            id="presupuesto"
            name="presupuesto"
            className="w-full p-2.5 border border-linea-2 bg-white text-[0.92rem]"
          >
            <option value="">Selecciona</option>
            <option>Aprobado</option>
            <option>En aprobación</option>
            <option>Explorando</option>
          </select>
        </div>
        <Campo id="aprueba" label="Quién aprueba la OC" placeholder="Cargo o área" />
        <Campo id="cantidad" label="Cantidad" type="number" placeholder="500" />
        <div className="sm:col-span-2">
          <Campo id="empresa" label="Empresa" />
        </div>
        <div className="sm:col-span-2">
          <Campo id="contacto" label="Correo o WhatsApp" />
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <label htmlFor="detalle" className="block text-[0.78rem] text-gris mb-1.5 font-semibold">
            Productos y detalle
          </label>
          <textarea
            id="detalle"
            name="detalle"
            rows={2}
            placeholder="Se completa solo con tu lista de cotización"
            className="w-full p-2.5 border border-linea-2 bg-white text-[0.92rem]"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <button type="submit" className="bg-marino text-white px-7 py-3.5 text-[0.94rem] font-bold hover:bg-marino-2">
            Evaluar mi proyecto
          </button>
          {mensaje && (
            <p className={`text-[0.87rem] mt-2.5 ${mensaje.tipo === "err" ? "text-alerta" : "text-ok"}`}>
              {mensaje.texto}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

function Campo({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.78rem] text-gris mb-1.5 font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full p-2.5 border border-linea-2 bg-white text-[0.92rem]"
      />
    </div>
  );
}
