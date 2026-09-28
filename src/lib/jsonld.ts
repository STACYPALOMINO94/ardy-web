import type { Producto } from "@/data/productos";
import { SITE_URL, SITE_NOMBRE } from "./config";
import { datoValido } from "./productos";

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
    // Un campo público sin dato real (ej. "[SIN_DATO]" del pipeline) nunca se
    // publica en datos estructurados que Google puede indexar.
    ...(datoValido(producto.material) ? { material: producto.material } : {}),
    url: `${SITE_URL}/productos/${producto.slug}`,
    // Genera offers para importación y nacionalizado por separado.
    // Solo precios > 0 se publican en datos estructurados indexables por Google.
    offers: [
      ...(producto.modalidades.importacion
        ? (Object.entries(producto.modalidades.importacion.precios) as Array<[string, number | null]>)
            .filter(([, v]) => v !== null && v > 0)
            .map(([cantidad, precio]) => ({
              "@type": "Offer",
              name: "Importación",
              priceCurrency: "PEN",
              price: precio,
              eligibleQuantity: {
                "@type": "QuantitativeValue",
                value: Number(cantidad),
              },
              availability:
                producto.disponibilidad === "En stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
              url: `${SITE_URL}/productos/${producto.slug}`,
            }))
        : []),
      ...(producto.modalidades.nacionalizado
        ? (Object.entries(producto.modalidades.nacionalizado.precios) as Array<[string, number | null]>)
            .filter(([, v]) => v !== null && v > 0)
            .map(([cantidad, precio]) => ({
              "@type": "Offer",
              name: "Nacionalizado",
              priceCurrency: "PEN",
              price: precio,
              eligibleQuantity: {
                "@type": "QuantitativeValue",
                value: Number(cantidad),
              },
              availability:
                producto.disponibilidad === "En stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
              url: `${SITE_URL}/productos/${producto.slug}`,
            }))
        : []),
    ],
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
