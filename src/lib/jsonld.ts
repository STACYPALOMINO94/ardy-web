import type { Producto } from "@/data/productos";
import { SITE_URL, SITE_NOMBRE } from "./config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NOMBRE,
    url: SITE_URL,
    description:
      "Importación aérea de merchandising de alto valor para eventos. Producto en blanco o marcado en Lima.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ nombre: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function productoJsonLd(producto: Producto) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcionLarga,
    category: producto.categoria,
    sku: String(producto.id),
    material: producto.material,
    url: `${SITE_URL}/productos/${producto.slug}`,
    offers: (Object.keys(producto.precios) as unknown as Array<keyof typeof producto.precios>).map((cantidad) => ({
      "@type": "Offer",
      priceCurrency: "PEN",
      price: producto.precios[cantidad],
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: Number(cantidad),
      },
      availability:
        producto.disponibilidad === "En stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: `${SITE_URL}/productos/${producto.slug}`,
    })),
  };
}

export function faqJsonLd(preguntas: Array<{ pregunta: string; respuesta: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.respuesta,
      },
    })),
  };
}
