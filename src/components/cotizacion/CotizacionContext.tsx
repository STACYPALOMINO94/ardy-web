"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getProductoPorSlug } from "@/lib/productos";

export interface ItemCotizacion {
  slug: string;
  cantidad: number;
}

interface CotizacionContextValue {
  items: Record<string, ItemCotizacion>;
  cantidadItems: number;
  estaEnCotizacion: (slug: string) => boolean;
  alternar: (slug: string) => void;
  agregar: (slug: string, cantidad: number) => void;
  actualizarCantidad: (slug: string, cantidad: number) => void;
  quitar: (slug: string) => void;
  resumenTexto: () => string;
}

const CotizacionContext = createContext<CotizacionContextValue | null>(null);

export function CotizacionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, ItemCotizacion>>({});

  const alternar = useCallback((slug: string) => {
    setItems((prev) => {
      if (prev[slug]) {
        const resto = { ...prev };
        delete resto[slug];
        return resto;
      }
      return { ...prev, [slug]: { slug, cantidad: 500 } };
    });
  }, []);

  const agregar = useCallback((slug: string, cantidad: number) => {
    setItems((prev) => ({ ...prev, [slug]: { slug, cantidad: Math.max(1, cantidad) } }));
  }, []);

  const actualizarCantidad = useCallback((slug: string, cantidad: number) => {
    setItems((prev) => (prev[slug] ? { ...prev, [slug]: { slug, cantidad: Math.max(1, cantidad) } } : prev));
  }, []);

  const quitar = useCallback((slug: string) => {
    setItems((prev) => {
      const resto = { ...prev };
      delete resto[slug];
      return resto;
    });
  }, []);

  const estaEnCotizacion = useCallback((slug: string) => Boolean(items[slug]), [items]);

  const resumenTexto = useCallback(() => {
    return Object.values(items)
      .map((item) => {
        const producto = getProductoPorSlug(item.slug);
        return producto ? `${producto.nombre} — ${item.cantidad} unidades` : null;
      })
      .filter(Boolean)
      .join("\n");
  }, [items]);

  const value = useMemo<CotizacionContextValue>(
    () => ({
      items,
      cantidadItems: Object.keys(items).length,
      estaEnCotizacion,
      alternar,
      agregar,
      actualizarCantidad,
      quitar,
      resumenTexto,
    }),
    [items, estaEnCotizacion, alternar, agregar, actualizarCantidad, quitar, resumenTexto]
  );

  return <CotizacionContext.Provider value={value}>{children}</CotizacionContext.Provider>;
}

export function useCotizacion(): CotizacionContextValue {
  const ctx = useContext(CotizacionContext);
  if (!ctx) throw new Error("useCotizacion debe usarse dentro de CotizacionProvider");
  return ctx;
}
