/**
 * Datos de contacto reales de ARDY Import.
 * El número de WhatsApp va en formato internacional sin "+" ni espacios.
 */
export const WHATSAPP_NUMERO = "51942577659";
export const CONTACTO_CORREO = "ardyimport@gmail.com";
export const SOURCING_PRECIO_PH = "[PH]";

/**
 * Dominio de producción. Todavía no está activo, así que en local (dev/build sin
 * NODE_ENV=production) se usa localhost:3000; en producción, ardyimport.pe.
 */
export const SITE_URL =
  process.env.NODE_ENV === "production" ? "https://ardyimport.pe" : "http://localhost:3000";
export const SITE_NOMBRE = "ARDY Import";

export function construirLinkWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
