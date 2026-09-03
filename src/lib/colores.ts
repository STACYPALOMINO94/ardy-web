/** Mapa de nombres de color (en español, como vienen en productos.ts) a su valor hexadecimal para el swatch. */
const MAPA_COLORES: Record<string, string> = {
  "níquel": "#B9BFC4",
  niquel: "#B9BFC4",
  dorado: "#C9A227",
  negro: "#33373B",
  "azul marino": "#16283C",
  marino: "#16283C",
  "verde oliva": "#6B7A4F",
  oliva: "#6B7A4F",
  plata: "#D6D9DC",
  blanco: "#F4EFE2",
  rojo: "#8E3B2E",
  azul: "#2F5A8A",
  celeste: "#6FA3C7",
  verde: "#3E6B41",
  amarillo: "#E3B65C",
  naranja: "#C1682E",
  morado: "#5B4B79",
  rosado: "#C98BA0",
  beige: "#DED6C4",
  "marrón": "#6B4A34",
  gris: "#8A8780",
};

export function getColorHex(nombre: string): string {
  return MAPA_COLORES[nombre.trim().toLowerCase()] ?? "#B9BFC4";
}
