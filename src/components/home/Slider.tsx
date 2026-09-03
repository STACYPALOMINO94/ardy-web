"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    eyebrow: "IMPORTACIÓN AÉREA",
    titulo: "Cuando el evento no puede esperar al próximo contenedor",
    texto: "Tres semanas en blanco, cuatro con tu logo grabado. El contenedor tarda dos meses.",
    cta: { href: "/productos", texto: "Ver catálogo" },
  },
  {
    eyebrow: "EN BLANCO O MARCADO",
    titulo: "La marca se pone acá, no en China",
    texto:
      "Como el grabado es en Lima, tu arte se aprueba mientras el producto vuela. No frenas el pedido esperando el diseño.",
    cta: { href: "/#publicos", texto: "Cómo trabajamos" },
  },
  {
    eyebrow: "NUEVOS MODELOS",
    titulo: "Lo que todavía no está en todos los catálogos",
    texto:
      "Tarjetas NFC, sets metálicos, cables multipuerto. La razón por la que una agencia no repite el llavero del año pasado.",
    cta: { href: "/#nuevos", texto: "Ver novedades" },
  },
];

export function Slider() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function ir(n: number) {
    setIdx((n + SLIDES.length) % SLIDES.length);
  }

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((v) => (v + 1) % SLIDES.length), 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [idx]);

  return (
    <div className="relative overflow-hidden bg-marino-2">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {SLIDES.map((s) => (
          <div
            key={s.titulo}
            className="min-w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 px-5 py-10 md:py-16 max-w-[1240px] mx-auto"
          >
            <div>
              <span className="inline-block bg-ambar text-marino-3 text-[0.74rem] font-bold tracking-[0.06em] px-[11px] py-[5px] mb-3.5">
                {s.eyebrow}
              </span>
              <h2 className="text-white text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.08]">{s.titulo}</h2>
              <p className="text-[#B9C7D6] mt-3 text-[1.02rem] max-w-[44ch]">{s.texto}</p>
              <Link
                href={s.cta.href}
                className="inline-block mt-[22px] bg-white text-marino px-[26px] py-[13px] font-bold text-[0.93rem] hover:bg-ambar-2"
              >
                {s.cta.texto}
              </Link>
            </div>
            <div className="flex justify-center items-center min-h-[150px] md:min-h-[230px] order-first md:order-none">
              <SlideArt seed={s.titulo.length} />
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white/[.13] text-white w-11 h-[60px] text-[1.3rem] z-[5] hover:bg-white/[.28]"
        aria-label="Anterior"
        onClick={() => ir(idx - 1)}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/[.13] text-white w-11 h-[60px] text-[1.3rem] z-[5] hover:bg-white/[.28]"
        aria-label="Siguiente"
        onClick={() => ir(idx + 1)}
      >
        ›
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[5]">
        {SLIDES.map((s, i) => (
          <button
            key={s.titulo}
            className={`h-[9px] rounded-full transition-all ${
              i === idx ? "bg-ambar-2 w-[26px]" : "bg-white/[.35] w-[9px]"
            }`}
            aria-current={i === idx}
            aria-label={`Ir al banner ${i + 1}`}
            onClick={() => ir(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** Figura abstracta de relleno, en lo que hay fotografía real de producto en el banner. */
function SlideArt({ seed }: { seed: number }) {
  const color = seed % 2 === 0 ? "var(--color-ambar-2)" : "#fff";
  return (
    <svg viewBox="0 0 100 100" className="w-[180px] md:w-[280px]" aria-hidden>
      <circle cx="50" cy="50" r="34" fill="none" stroke={color} strokeWidth="3" opacity="0.5" />
      <path d="M50 8 L84 30 V70 L50 92 L16 70 V30 Z" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="10" fill={color} />
    </svg>
  );
}
