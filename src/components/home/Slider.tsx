"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { construirLinkWhatsApp } from "@/lib/config";

/**
 * Fotografía de cada slide: son los assets aprobados del Handoff (image-slot
 * ardy-hero-1/2/3, exportados a public/img/home/hero-N.webp). Van con
 * object-contain sobre fondo transparente, igual que fit="contain" en el
 * diseño — no sustituir por fotos de escena con fondo de color.
 */
const SLIDES = [
  {
    eyebrow: "IMPORTACIÓN · MERCHANDISING · SOLUCIONES PARA EMPRESAS",
    titulo: "Merchandising corporativo que llega a tiempo",
    texto:
      "Importamos, personalizamos y entregamos soluciones de merchandising para tu marca, con la rapidez de la importación aérea.",
    ctaPrincipal: { href: "/productos", texto: "Ver productos" },
    mensajeWhatsApp: "Hola, quiero cotizar merchandising corporativo para mi empresa.",
    imagen: "/img/home/hero-1.webp",
    alt: "Set corporativo ARDY: botella térmica, taza, cuadernos, USB y lapicero",
  },
  {
    eyebrow: "SOURCING · PROVEEDORES · CHINA",
    titulo: "Buscamos el producto que tu proyecto necesita",
    texto:
      "Si no está en el catálogo, lo encontramos. Trabajamos con proveedores verificados y te entregamos una propuesta clara.",
    ctaPrincipal: { href: "/sourcing-importacion-china", texto: "Ver sourcing" },
    mensajeWhatsApp: "Hola, necesito un producto que no veo en el catálogo. ¿Pueden ayudarme a buscarlo?",
    imagen: "/img/home/hero-2.webp",
    alt: "Búsqueda de productos: gorro, power bank, taza, llavero y tarjetas NFC",
  },
  {
    eyebrow: "AGENCIAS · EVENTOS · CAMPAÑAS",
    titulo: "Kits corporativos listos para tu activación",
    texto:
      "Producción, personalización y entrega coordinada para ferias, lanzamientos y campañas con fechas ajustadas.",
    ctaPrincipal: { href: "/soluciones-corporativas", texto: "Ver soluciones" },
    mensajeWhatsApp: "Hola, quiero cotizar un kit corporativo para un evento.",
    imagen: "/img/home/hero-3.webp",
    alt: "Kit corporativo ARDY: caja, tomatodo y cuaderno",
  },
];

export function Slider() {
  const [idx, setIdx] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function ir(n: number) {
    setIdx((n + SLIDES.length) % SLIDES.length);
  }

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((v) => (v + 1) % SLIDES.length), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [idx, reduceMotion]);

  return (
    <section className="bg-white" style={{ padding: "clamp(36px,5vw,64px) 0 clamp(28px,4vw,48px)" }}>
      <div className="max-w-[1240px] mx-auto" style={{ padding: "0 clamp(20px,11vw,220px)" }}>
        <div className="grid">
          {SLIDES.map((s, i) => {
            const activo = i === idx;
            return (
              <div
                key={s.titulo}
                className="[grid-area:1/1] grid items-center transition-[opacity,transform] duration-700 ease-out"
                style={{
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  gap: "clamp(28px,4vw,56px)",
                  minHeight: "clamp(320px,34vw,440px)",
                  opacity: activo ? 1 : 0,
                  transform: activo ? "translateY(0)" : "translateY(14px)",
                  pointerEvents: activo ? "auto" : "none",
                }}
              >
                <div key={activo ? `activo-${idx}` : `idle-${i}`}>
                  <p className="mb-[22px] text-[11.5px] font-bold tracking-[.18em] text-oliva">{s.eyebrow}</p>
                  <h2
                    className={`text-[clamp(2.125rem,4.4vw,3.5rem)] leading-[1.06] font-extrabold tracking-[-.02em] text-marino text-balance ${
                      activo && !reduceMotion ? "animate-[banner-titulo-in_600ms_ease-out_both]" : ""
                    }`}
                  >
                    {s.titulo}
                  </h2>
                  <p
                    className={`mt-[22px] max-w-[480px] text-[17px] leading-[1.6] text-gris text-pretty ${
                      activo && !reduceMotion
                        ? "animate-[banner-subtitulo-in_600ms_ease-out_both] [animation-delay:150ms]"
                        : ""
                    }`}
                  >
                    {s.texto}
                  </p>
                  <div
                    className={`flex gap-3.5 flex-wrap mt-8 ${
                      activo && !reduceMotion
                        ? "animate-[banner-boton-in_600ms_ease-out_both] [animation-delay:300ms]"
                        : ""
                    }`}
                  >
                    <Link
                      href={s.ctaPrincipal.href}
                      className="bg-marino text-white font-bold text-[15px] px-7 py-[15px] rounded-[8px] hover:bg-marino-press"
                    >
                      {s.ctaPrincipal.texto}
                    </Link>
                    <a
                      href={construirLinkWhatsApp(s.mensajeWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-marino text-marino font-semibold text-[15px] px-7 py-3.5 rounded-[8px] hover:bg-marino hover:text-white"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
                <div className="w-full h-[clamp(300px,32vw,420px)] overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-contain"
                    src={s.imagen}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 justify-center mt-9">
          {SLIDES.map((s, i) => (
            <button
              key={s.titulo}
              className={`h-2 rounded-full transition-all ${i === idx ? "bg-ambar w-[26px]" : "bg-[#D8D3C6] w-2"}`}
              aria-current={i === idx}
              aria-label={`Ir al banner ${i + 1}`}
              onClick={() => ir(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
