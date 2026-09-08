import { productos, type Producto } from "@/data/productos";
import { CATEGORIAS_OFICIALES } from "./categorias";

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

/**
 * Las 28 categorías oficiales (ver lib/categorias.ts), con la cantidad de
 * productos que caen en cada una. Se listan TODAS, incluidas las que todavía
 * tienen 0 productos: la taxonomía es fija, no se deriva de los datos.
 */
export function getCategorias(): Categoria[] {
  const conteos = new Map<string, number>();
  for (const p of productos) {
    const slug = toSlug(p.categoria);
    conteos.set(slug, (conteos.get(slug) ?? 0) + 1);
  }
  return CATEGORIAS_OFICIALES.map((c) => ({
    nombre: c.nombre,
    slug: c.slug,
    cantidad: conteos.get(c.slug) ?? 0,
  }));
}

/** Productos marcados como destacados (campo editorial `destacado` en productos.ts). */
export function getDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}

export function getNuevos(): Producto[] {
  return productos.filter((p) => p.esNovedad);
}

export function formatPrecio(valor: number): string {
  return `S/ ${valor.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Precio unitario más barato realmente disponible para un producto: la
 * cantidad más alta que cumple el MOQ y tiene precio cargado (> 0). Nunca
 * devuelve un tier por debajo del MOQ ni un precio en S/ 0.00; si ningún
 * tier tiene precio válido, devuelve null (mostrar "a consultar").
 */
export function getPrecioDesde(producto: Producto): number | null {
  const cantidades = [1000, 500, 300, 100] as const;
  for (const c of cantidades) {
    if (c >= producto.moq && producto.precios[c] > 0) return producto.precios[c];
  }
  return null;
}

export function getProductoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getProductosPorCategoriaSlug(slug: string): Producto[] {
  return productos.filter((p) => toSlug(p.categoria) === slug);
}
