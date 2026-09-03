"use client";

import { useState } from "react";
import { evaluarPlazo, type EstadoPlazo } from "@/lib/plazos";

const ESTILOS_ESTADO: Record<EstadoPlazo, string> = {
  ok: "border-oliva text-ok",
  ajustado: "border-ambar text-[#8A6318]",
  "no-llega": "border-alerta text-alerta",
  invalido: "border-linea-2 text-gris",
};

export function Validador() {
  const [disponibilidad, setDisponibilidad] = useState<"stock" | "produccion">("stock");
  const [fecha, setFecha] = useState("");
  const [marcado, setMarcado] = useState<"no" | "si">("no");
  const [resultado, setResultado] = useState<{ estado: EstadoPlazo; mensaje: string } | null>(null);

  function calcular() {
    setResultado(
      evaluarPlazo({
        fechaEvento: fecha,
        bajoProduccion: disponibilidad === "produccion",
        conGrabado: marcado === "si",
      })
    );
  }

  return (
    <div className="bg-crema-2 border-b border-linea">
      <div className="mx-auto max-w-[1240px] px-5 flex gap-4 items-end flex-wrap py-6">
        <div className="flex flex-col gap-[5px] w-full sm:w-auto">
          <label htmlFor="vstock" className="text-[0.76rem] text-gris font-semibold tracking-[0.02em]">
            Disponibilidad
          </label>
          <select
            id="vstock"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value as "stock" | "produccion")}
            className="px-2.5 py-2.5 border border-linea-2 bg-white text-[0.92rem] text-tinta min-w-[168px]"
          >
            <option value="stock">En stock de fábrica</option>
            <option value="produccion">Bajo producción</option>
          </select>
        </div>
        <div className="flex flex-col gap-[5px] w-full sm:w-auto">
          <label htmlFor="vfecha" className="text-[0.76rem] text-gris font-semibold tracking-[0.02em]">
            Fecha del evento
          </label>
          <input
            id="vfecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="px-2.5 py-2.5 border border-linea-2 bg-white text-[0.92rem] text-tinta min-w-[168px]"
          />
        </div>
        <div className="flex flex-col gap-[5px] w-full sm:w-auto">
          <label htmlFor="vmarc" className="text-[0.76rem] text-gris font-semibold tracking-[0.02em]">
            Marcado
          </label>
          <select
            id="vmarc"
            value={marcado}
            onChange={(e) => setMarcado(e.target.value as "no" | "si")}
            className="px-2.5 py-2.5 border border-linea-2 bg-white text-[0.92rem] text-tinta min-w-[168px]"
          >
            <option value="no">En blanco</option>
            <option value="si">Con grabado en Lima</option>
          </select>
        </div>
        <button
          className="bg-marino text-white px-[22px] py-[11px] font-bold text-[0.92rem] hover:bg-marino-2"
          onClick={calcular}
        >
          ¿Llego a tiempo?
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`flex-1 min-w-[250px] text-[0.88rem] border-l-4 pl-3.5 py-1.5 ${
            resultado ? ESTILOS_ESTADO[resultado.estado] : "border-linea-2 text-gris"
          }`}
        >
          {resultado ? resultado.mensaje : "Ingresa tu fecha y te digo si es viable por vía aérea."}
        </p>
      </div>
    </div>
  );
}
