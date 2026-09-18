"use client";

import { useState } from "react";
import { construirLinkWhatsApp } from "@/lib/config";

/*
  Pestañas de la página Soluciones corporativas (ver
  /diseños/Rediseño página Soluciones corporativas). Un solo estado — la
  pestaña activa — del que se derivan título, lead, descripción, lista de
  aplicaciones, texto del CTA e imagen del panel. El resto de la página no
  se mueve al cambiar de pestaña.
*/

interface Tab {
  id: string;
  label: string;
  lead: string;
  descripcion: string;
  items: string[];
  cta: string;
  foto: string;
  alt: string;
}

const TABS: Tab[] = [
  {
    id: "eventos",
    label: "Eventos y activaciones",
    lead: "Productos que llegan a tiempo para tu evento.",
    descripcion:
      "Merchandising corporativo para activaciones de marca, ferias, congresos, lanzamientos y campañas promocionales.",
    items: [
      "Activaciones de marca",
      "Ferias y congresos",
      "Lanzamientos",
      "Eventos corporativos",
      "Campañas promocionales",
    ],
    cta: "Cotizar para mi evento",
    foto: "/img/soluciones-corporativas/foto-eventos.png",
    alt: "Set de merchandising para evento: bolsa de tela, gorra, botellas, termos, cuadernos y lanyards personalizados",
  },
  {
    id: "regalos",
    label: "Regalos corporativos",
    lead: "Regalos con tu marca, listos cuando los necesitas.",
    descripcion:
      "Piezas individuales y sets para clientes, aliados y equipos internos, con personalización y empaque a medida.",
    items: [
      "Regalos de fin de año",
      "Bienvenida de clientes",
      "Reconocimientos internos",
      "Aniversarios de marca",
      "Sets de escritorio",
    ],
    cta: "Cotizar regalos corporativos",
    foto: "/img/soluciones-corporativas/foto-regalos.png",
    alt: "Set de regalo corporativo en caja azul con termo, lapicero, libreta y bolsa de tela",
  },
  {
    id: "merch",
    label: "Merch para empresas",
    lead: "Merch de uso diario para tu equipo.",
    descripcion:
      "Líneas de producto para uso interno y cotidiano: textiles, tecnología, escritorio y bebida, con tu logo aplicado.",
    items: [
      "Uniformes y textiles",
      "Tecnología y accesorios",
      "Botellas y termos",
      "Cuadernos y escritorio",
      "Credenciales y lanyards",
    ],
    cta: "Cotizar merch para mi equipo",
    foto: "/img/soluciones-corporativas/foto-merch.png",
    alt: "Merch de uso diario: mochila, botella, termo, cuadernos, mouse pad, lanyard y accesorios de tecnología",
  },
  {
    id: "retail",
    label: "Retail y promociones",
    lead: "Producto promocional para tu punto de venta.",
    descripcion:
      "Piezas para campañas, promociones y material de exhibición, en volúmenes altos y con fechas definidas.",
    items: [
      "Campañas promocionales",
      "Material de exhibición",
      "Packaging promocional",
      "Ediciones limitadas",
      "Premios y sorteos",
    ],
    cta: "Cotizar mi campaña",
    foto: "/img/soluciones-corporativas/foto-retail.png",
    alt: "Productos promocionales para punto de venta: bolsa de tela, gorra, audífonos, lentes, toalla y power bank",
  },
  {
    id: "especiales",
    label: "Proyectos especiales",
    lead: "Si no existe en catálogo, lo buscamos.",
    descripcion:
      "Sourcing y desarrollo de producto a medida desde China, con muestras previas, control de calidad y ruta de importación definida.",
    items: [
      "Desarrollo de producto a medida",
      "Búsqueda de proveedores",
      "Muestras previas a producción",
      "Empaque personalizado",
      "Importación aérea o marítima",
    ],
    cta: "Solicitar búsqueda",
    foto: "/img/soluciones-corporativas/foto-especiales.png",
    alt: "Proyecto especial con empaque a medida: botella, audífonos y libreta en cajas de cartón desarrolladas a pedido",
  },
];

export function SolucionesTabs() {
  const [activaId, setActivaId] = useState(TABS[0].id);
  const activa = TABS.find((t) => t.id === activaId) ?? TABS[0];

  return (
    <>
      <section className="pb-16">
        <div className="mx-auto max-w-[1240px] px-8">
          <div
            role="tablist"
            aria-label="Tipos de solución corporativa"
            className="grid grid-cols-1 sm:grid-cols-5 border border-linea-soft rounded-md overflow-hidden shadow-hairline"
          >
            {TABS.map((t, i) => {
              const activo = t.id === activaId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={activo}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setActivaId(t.id)}
                  className={`relative text-center px-[18px] pt-5 pb-[22px] text-[15px] leading-[1.35] border-linea-soft sm:border-l transition-[background-color,color] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    i > 0 ? "border-t sm:border-t-0" : ""
                  } ${activo ? "bg-marino text-white font-bold" : "bg-white text-marino font-medium"}`}
                >
                  {t.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -bottom-[7px] size-3.5 -translate-x-1/2 rotate-45 ${
                      activo ? "bg-marino" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id={`panel-${activa.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activa.id}`}
        className="pb-16 lg:pb-24"
      >
        <div className="mx-auto max-w-[1240px] px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-16 items-center">
          <div>
            <h2 className="text-marino text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.02em]">
              {activa.label}
            </h2>
            <p className="text-marino text-[18px] leading-[1.65] max-w-[420px] mt-4 text-pretty">{activa.lead}</p>
            <p className="text-gris text-[16px] leading-[1.65] max-w-[460px] mt-6 text-pretty">{activa.descripcion}</p>
            <div className="h-px bg-linea-soft max-w-[300px] my-8" />
            <ul className="list-none flex flex-col gap-[14px]">
              {activa.items.map((item) => (
                <li key={item} className="text-marino text-[16px] leading-[1.4] font-medium">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a
                href={construirLinkWhatsApp(`Hola, quiero cotizar: ${activa.label.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-[15px] rounded-sm bg-ambar text-white font-semibold text-[16px] hover:bg-ambar-accent"
              >
                {activa.cta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {/*
            Las fotos son recortes en PNG con fondo transparente (1536x1024) y el
            producto llega casi al borde del lienzo, así que el gris del diseño es
            el fondo del contenedor, no de la imagen. Con object-cover el
            contenedor (más apaisado que 3:2) cortaba arriba y abajo; con
            object-contain se ve la pieza completa y el contenedor mantiene sus
            dimensiones del diseño: 100% de ancho, 332px de alto, radius-lg.
          */}
          <div className="rounded-lg overflow-hidden bg-fog">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activa.foto} alt={activa.alt} className="block w-full h-[332px] object-contain" />
          </div>
        </div>
      </section>
    </>
  );
}
