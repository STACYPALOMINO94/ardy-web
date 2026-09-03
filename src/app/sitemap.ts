import type { MetadataRoute } from "next";
import { productos } from "@/data/productos";
import { getCategorias } from "@/lib/productos";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

const RUTAS_ESTATICAS = [
  "",
  "/productos",
  "/nuevos-modelos",
  "/importacion-aerea-merchandising",
  "/marcado-y-personalizacion-lima",
  "/para-agencias-de-eventos",
  "/para-revendedores-e-imprentas",
  "/sourcing-importacion-china",
  "/como-funciona",
  "/nosotros",
  "/contacto",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const fechaActual = new Date();

  const estaticas: MetadataRoute.Sitemap = RUTAS_ESTATICAS.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: fechaActual,
    changeFrequency: ruta === "" ? "daily" : "weekly",
    priority: ruta === "" ? 1 : 0.7,
  }));

  const categorias: MetadataRoute.Sitemap = getCategorias().map((c) => ({
    url: `${SITE_URL}/categoria/${c.slug}`,
    lastModified: fechaActual,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const fichas: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${SITE_URL}/productos/${p.slug}`,
    lastModified: p.fechaActualizacion,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...estaticas, ...categorias, ...fichas];
}
