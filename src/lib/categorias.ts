/**
 * Taxonomía oficial de categorías de ARDY Import — 28 categorías fijas.
 * Esta es la fuente de verdad de la estructura de catálogo del sitio
 * (nav, footer, rutas /categoria/[slug], sitemap). A diferencia del listado
 * de categorías anterior, NO se deriva de productos.ts: los productos se
 * clasifican dentro de esta taxonomía, no al revés.
 *
 * El slug de cada categoría surge de aplicar toSlug() (ver lib/productos.ts)
 * al campo "nombre" — por eso los nombres compuestos usan "&" (ej. "Llaveros
 * & Accesorios" → "llaveros-accesorios"), no cambiar ese formato sin also
 * actualizar el slug oficial correspondiente.
 */

export interface CategoriaOficial {
  slug: string;
  nombre: string;
}

export const CATEGORIAS_OFICIALES: CategoriaOficial[] = [
  { slug: "tecnologia", nombre: "Tecnología" },
  { slug: "escritura", nombre: "Escritura" },
  { slug: "oficina", nombre: "Oficina" },
  { slug: "identificacion-credenciales", nombre: "Identificación & Credenciales" },
  { slug: "llaveros-accesorios", nombre: "Llaveros & Accesorios" },
  { slug: "viaje", nombre: "Viaje" },
  { slug: "bolsos-organizadores", nombre: "Bolsos & Organizadores" },
  { slug: "belleza", nombre: "Belleza" },
  { slug: "salud-higiene", nombre: "Salud & Higiene" },
  { slug: "hogar-lifestyle", nombre: "Hogar & Lifestyle" },
  { slug: "cocina-bebidas", nombre: "Cocina & Bebidas" },
  { slug: "mascotas", nombre: "Mascotas" },
  { slug: "ninos-familia", nombre: "Niños & Familia" },
  { slug: "deporte-fitness", nombre: "Deporte & Fitness" },
  { slug: "bienestar-relax", nombre: "Bienestar & Relax" },
  { slug: "herramientas-multifuncion", nombre: "Herramientas & Multifunción" },
  { slug: "seguridad-proteccion", nombre: "Seguridad & Protección" },
  { slug: "automotriz", nombre: "Automotriz" },
  { slug: "outdoor-aventura", nombre: "Outdoor & Aventura" },
  { slug: "eco-sostenibilidad", nombre: "Eco & Sostenibilidad" },
  { slug: "escolar-educacion", nombre: "Escolar & Educación" },
  { slug: "industria-trabajo", nombre: "Industria & Trabajo" },
  { slug: "construccion-seguridad-laboral", nombre: "Construcción & Seguridad Laboral" },
  { slug: "eventos-promocion", nombre: "Eventos & Promoción" },
  { slug: "reconocimiento-premios", nombre: "Reconocimiento & Premios" },
  { slug: "regalos-corporativos", nombre: "Regalos Corporativos" },
  { slug: "accesorios-personales", nombre: "Accesorios Personales" },
  { slug: "creatividad-hobby", nombre: "Creatividad & Hobby" },
];

/** Las 6 categorías fijas del mosaico del Home, en este orden exacto. */
export const CATEGORIAS_MOSAICO_HOME = [
  "tecnologia",
  "escritura",
  "llaveros-accesorios",
  "bolsos-organizadores",
  "deporte-fitness",
  "mascotas",
] as const;

export function buscarCategoriaOficial(slug: string): CategoriaOficial | undefined {
  return CATEGORIAS_OFICIALES.find((c) => c.slug === slug);
}
