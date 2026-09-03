/**
 * Artículos del blog. Estructura lista para recibir contenido; todavía sin
 * publicar (ver PROMPT.md FASE 3, punto 7: "estructura vacía lista para contenido").
 */

export interface Post {
  slug: string;
  titulo: string;
  resumen: string;
  contenidoHtml: string;
  fechaPublicacion: string;
  seoTitle: string;
  seoMeta: string;
}

export const posts: Post[] = [];
