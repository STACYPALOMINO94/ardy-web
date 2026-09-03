"use client";

import { useRef, type ReactNode } from "react";

export function Carrusel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function mover(dir: 1 | -1) {
    ref.current?.scrollBy({ left: 252 * dir, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1.5 [scrollbar-width:thin]"
      >
        {children}
      </div>
      <button
        className="hidden md:flex absolute top-[38%] -left-3.5 bg-white border border-linea-2 w-[38px] h-[38px] text-[1.1rem] text-marino z-[6] shadow-[0_2px_8px_rgba(0,0,0,.09)] items-center justify-center hover:bg-marino hover:text-white hover:border-marino"
        aria-label="Anterior"
        onClick={() => mover(-1)}
      >
        ‹
      </button>
      <button
        className="hidden md:flex absolute top-[38%] -right-3.5 bg-white border border-linea-2 w-[38px] h-[38px] text-[1.1rem] text-marino z-[6] shadow-[0_2px_8px_rgba(0,0,0,.09)] items-center justify-center hover:bg-marino hover:text-white hover:border-marino"
        aria-label="Siguiente"
        onClick={() => mover(1)}
      >
        ›
      </button>
    </div>
  );
}
