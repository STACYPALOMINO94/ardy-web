import registry from "@/data/product-skus.json";
import type { Producto } from "@/data/productos";

/** Códigos maestros cuando existen; códigos WEB separados para el catálogo antiguo.
 * El registro es independiente del id numérico que el pipeline reasigna.
 * Los slugs anteriores conservan el SKU cuando un producto cambia de nombre. */
export function getSku(producto: Pick<Producto, "slug" | "slugsAnteriores" | "sku">): string {
  if (producto.sku && /^ARDY-\d{3}$/.test(producto.sku)) return producto.sku;
  const codes: Record<string, string> = registry;
  for (const slug of [producto.slug, ...producto.slugsAnteriores]) {
    if (codes[slug]) return codes[slug];
  }
  return `ARDY-WEB-${producto.slug.toUpperCase()}`;
}

export function hasNationalStock(producto: Pick<Producto, "modalidades">): boolean {
  return producto.modalidades.nacionalizado !== null;
}
