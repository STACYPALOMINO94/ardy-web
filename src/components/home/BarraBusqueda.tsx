"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function BarraBusqueda() {
  const router = useRouter();
  const [valor, setValor] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = valor.trim();
    router.push(q ? `/productos?q=${encodeURIComponent(q)}` : "/productos");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-3 flex-wrap items-center border border-[#E7E3D8] rounded-xl p-[10px] pl-[22px] bg-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="1.7" className="shrink-0">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </svg>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Buscar producto, categoría o solución..."
        className="flex-[1_1_240px] min-w-0 border-none outline-none text-[15.5px] text-marino bg-transparent py-3"
      />
      <button
        type="submit"
        className="bg-marino text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-[8px] hover:bg-marino-press"
      >
        Buscar
      </button>
    </form>
  );
}
