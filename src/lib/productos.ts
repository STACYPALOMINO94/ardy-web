import { productos, type Producto } from "@/data/productos";
import { normalizarCategoriaPublica } from "./categorias";

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

/** Categorías públicas presentes en el catálogo publicado, agrupadas por nombre normalizado. */
export function getCategorias(): Categoria[] {
  const conteos = new Map<string, number>();
  for (const p of productos) {
    if (!datoValido(p.categoria)) continue;
    const nombre = normalizarCategoriaPublica(p.categoria);
    conteos.set(nombre, (conteos.get(nombre) ?? 0) + 1);
  }
  return [...conteos].map(([nombre, cantidad]) => ({ nombre, slug: toSlug(nombre), cantidad }));
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
 * Precio unitario más barato de la modalidad importación: el tier más alto
 * disponible (> 0). Devuelve null si no hay modalidad de importación o ningún
 * tier tiene precio cargado.
 */
export function getPrecioDesdeImportacion(producto: Producto): number | null {
  const imp = producto.modalidades.importacion;
  if (!imp) return null;
  const { precios } = imp;
  for (const c of [1000, 500, 100] as const) {
    const v = precios[c];
    if (v !== null && v > 0) return v;
  }
  return null;
}

/**
 * Precio unitario más barato de la modalidad nacionalizado: el tier más alto
 * disponible (> 0). Devuelve null si no hay modalidad nacional o ningún tier
 * tiene precio cargado.
 */
export function getPrecioDesdeNacionalizado(producto: Producto): number | null {
  const nac = producto.modalidades.nacionalizado;
  if (!nac) return null;
  const { precios } = nac;
  for (const c of [500, 100, 50] as const) {
    const v = precios[c];
    if (v !== null && v > 0) return v;
  }
  return null;
}

/**
 * Precio unitario más barato del producto, considerando ambas modalidades.
 * Devuelve el menor de los dos precios desde disponibles, o null si ninguno
 * tiene precio cargado (mostrar "a consultar").
 */
export function getPrecioDesde(producto: Producto): number | null {
  const imp = getPrecioDesdeImportacion(producto);
  const nac = getPrecioDesdeNacionalizado(producto);
  if (imp !== null && nac !== null) return Math.min(imp, nac);
  return imp ?? nac;
}

const PLACEHOLDERS_DATO_FALTANTE = new Set(["[sin_dato]", "n/a", "undefined", "null", "-", "—"]);

/**
 * Un campo público sin dato real nunca se renderiza (ni etiqueta, ni valor,
 * ni fila, ni tarjeta) — el pipeline (procesar-catalogo.mjs) puede dejar
 * "[SIN_DATO]" como valor real en productos.ts cuando el CSV de origen no
 * traía el campo; esto detecta ese y otros placeholders equivalentes para
 * que la UI los trate como ausentes, sin tocar el dato guardado.
 */
export function datoValido(valor: unknown): valor is string {
  if (typeof valor !== "string") return false;
  const limpio = valor.trim();
  if (!limpio) return false;
  return !PLACEHOLDERS_DATO_FALTANTE.has(limpio.toLowerCase());
}

export function getProductoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getProductosPorCategoriaSlug(slug: string): Producto[] {
  return productos.filter((p) => toSlug(normalizarCategoriaPublica(p.categoria)) === slug);
}
