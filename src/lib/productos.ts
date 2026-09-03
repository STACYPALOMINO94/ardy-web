import { productos, type Producto } from "@/data/productos";

export function toSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface Categoria {
  nombre: string;
  slug: string;
  cantidad: number;
}

/** Categorías únicas leídas dinámicamente de productos.ts. Nunca hardcodear. */
export function getCategorias(): Categoria[] {
  const mapa = new Map<string, number>();
  for (const p of productos) {
    mapa.set(p.categoria, (mapa.get(p.categoria) ?? 0) + 1);
  }
  return [...mapa.entries()].map(([nombre, cantidad]) => ({
    nombre,
    slug: toSlug(nombre),
    cantidad,
  }));
}

/**
 * Selección de destacados. El esquema de datos aún no trae un flag "destacado"
 * dedicado (ver PROMPT.md); mientras tanto se muestran los primeros N productos
 * en stock, en el orden que llegan del catálogo.
 */
export function getDestacados(n = 8): Producto[] {
  return productos.filter((p) => p.disponibilidad === "En stock").slice(0, n);
}

export function getNuevos(): Producto[] {
  return productos.filter((p) => p.esNovedad);
}

export function formatPrecio(valor: number): string {
  return `S/ ${valor.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getProductoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getProductosPorCategoriaSlug(slug: string): Producto[] {
  return productos.filter((p) => toSlug(p.categoria) === slug);
}
