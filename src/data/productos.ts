/**
 * Catálogo de productos de ARDY Import.
 *
 * Este archivo se actualiza automáticamente vía el pipeline descrito en PROMPT.md
 * (CSV del cotizador → Google Apps Script → src/data/raw/*.json → GitHub Actions →
 * scripts/procesar-catalogo.mjs → este archivo → redeploy en Vercel).
 * NUNCA EDITAR A MANO en producción.
 *
 * Mientras el pipeline no haya procesado un CSV real, este archivo contiene datos
 * semilla (mismo formato exacto) para que el sitio tenga contenido real desde FASE 1.
 */

export interface PreciosImportacion {
  100: number | null;
  500: number | null;
  1000: number | null;
}

export interface PreciosNacionalizado {
  50: number | null;
  100: number | null;
  500: number | null;
}

export interface ModalidadImportacion {
  precios: PreciosImportacion;
}

export interface ModalidadNacionalizado {
  precios: PreciosNacionalizado;
}

export interface Producto {
  id: number;
  slug: string;
  /** Slugs anteriores de este producto. El pipeline genera un redirect 301 desde cada uno al slug actual. */
  slugsAnteriores: string[];
  nombre: string;
  categoria: string;
  descripcionCorta: string;
  descripcionLarga: string;
  moq: number;
  modalidades: {
    importacion: ModalidadImportacion | null;
    nacionalizado: ModalidadNacionalizado | null;
  };
  material: string;
  tecnicas: string[];
  areaMarcado: string;
  colores: string[];
  tallas: string[];
  /** Opcional: formatos de presentación del producto (ej. "Estuche individual", "Caja x12"). No todos los productos lo tienen cargado todavía. */
  presentaciones?: string[];
  disponibilidad: string;
  /** "Sí" cuando el producto requiere permiso de internamiento MTC, "No" cuando no lo requiere, "Pendiente de validación" cuando está en trámite, null cuando no se ha determinado. */
  permisoMtc: "Sí" | "No" | "Pendiente de validación" | null;
  esNovedad: boolean;
  destacado: boolean;
  fotos: Array<{ url: string; alt: string }>;
  seoTitle: string;
  seoMeta: string;
  palabraClave: string;
  fechaActualizacion: string;
}

export const productos: Producto[] = [
  {
    id: 17,
    slug: "bandana-para-mascotas",
    slugsAnteriores: [],
    nombre: "Bandana para mascotas",
    categoria: "Mascotas",
    descripcionCorta: "Bandana para mascotas de poliéster, personalizable, ideal para mascotas y activaciones de marca.",
    descripcionLarga: "Bandana para mascotas de poliéster de alta calidad, disponible en 6 colores y 3 tallas (L, M, S). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite DTF textil y serigrafía, con área de marcado de 10 x 10 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    modalidades: {
      importacion: { precios: { 100: 2.45, 500: 2.33, 1000: 2.29 } },
      nacionalizado: null,
    },
    material: "Poliéster",
    tecnicas: ["DTF TEXTIL", "SERIGRAFIA"],
    areaMarcado: "10 x 10",
    colores: ["Rojo", "Negro", "Azul", "Blanco", "Verde", "Naranja"],
    tallas: ["L", "M", "S"],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: false,
    destacado: true,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788888995/ardy-import/productos/bandana-para-mascotas/foto-1.jpg", alt: "Bandana para mascotas de poliéster en varios colores, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889002/ardy-import/productos/bandana-para-mascotas/foto-2.jpg", alt: "Bandana para mascotas de poliéster, detalle de textura y acabado." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889007/ardy-import/productos/bandana-para-mascotas/foto-3.jpg", alt: "Bandana para mascotas con marcado en área de 10 x 10 cm, vista de personalización." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889012/ardy-import/productos/bandana-para-mascotas/foto-4.jpg", alt: "Bandana para mascotas mostrando tallas disponibles: L, M, S." },
    ],
    seoTitle: "Bandana para Mascotas personalizada | ARDY Import",
    seoMeta: "Bandana para mascotas de poliéster personalizable con DTF textil y serigrafía. MOQ 100 unidades. 6 colores, 3 tallas. Plazo 3 semanas en blanco. Pide cotizac...",
    palabraClave: "bandana para mascotas personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 18,
    slug: "toalla-deportiva-absorbente-con-estuche-de-silicona",
    slugsAnteriores: [],
    nombre: "Toalla deportiva absorbente con estuche de silicona",
    categoria: "Deporte & Fitness",
    descripcionCorta: "Toalla deportiva absorbente con estuche de silicona, personalizable, ideal para textil y activaciones de marca.",
    descripcionLarga: "Toalla deportiva absorbente con estuche de silicona de alta calidad, disponible en 7 colores. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 300 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 300,
    modalidades: {
      importacion: { precios: { 100: null, 500: 8.28, 1000: 8.13 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: ["Rojo", "Negro", "Verde", "Azul", "Naranja", "Lila", "fuscia"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889017/ardy-import/productos/toalla-deportiva-absorbente-con-estuche-de-silicona/foto-1.jpg", alt: "Toalla deportiva absorbente con estuche de silicona, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889022/ardy-import/productos/toalla-deportiva-absorbente-con-estuche-de-silicona/foto-2.jpg", alt: "Toalla deportiva absorbente con estuche de silicona, detalle de textura." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889027/ardy-import/productos/toalla-deportiva-absorbente-con-estuche-de-silicona/foto-3.jpg", alt: "Toalla deportiva absorbente con estuche de silicona, vista lateral." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889032/ardy-import/productos/toalla-deportiva-absorbente-con-estuche-de-silicona/foto-4.jpg", alt: "Toalla deportiva absorbente con estuche de silicona, vista de empaque." },
    ],
    seoTitle: "Toalla Deportiva Absorbente con Estuche de Silicona | ARD...",
    seoMeta: "MOQ 300 unidades. 7 colores. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "toalla deportiva absorbente con estuche de silicona personalizada",
    fechaActualizacion: "2026-09-08",
  },
  {
    id: 19,
    slug: "espejo-con-mango-de-sandalo",
    slugsAnteriores: [],
    nombre: "Espejo con mango de sándalo",
    categoria: "Belleza",
    descripcionCorta: "Espejo con mango de sándalo, personalizable, ideal para otro y activaciones de marca.",
    descripcionLarga: "Espejo con mango de sándalo de alta calidad. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 650 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 650,
    modalidades: {
      importacion: { precios: { 100: null, 500: 11, 1000: null } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: [],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889038/ardy-import/productos/espejo-con-mango-de-sandalo/foto-1.jpg", alt: "Espejo con mango de sándalo, vista frontal." },
    ],
    seoTitle: "Espejo con Mango de Sándalo personalizada | ARDY Import",
    seoMeta: "MOQ 650 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "espejo con mango de sandalo personalizada",
    fechaActualizacion: "2026-09-08",
  },
  {
    id: 20,
    slug: "auriculares-bluetooth-i7mini",
    slugsAnteriores: [],
    nombre: "Auriculares bluetooth i7mini",
    categoria: "Tecnología",
    descripcionCorta: "Auriculares bluetooth i7mini, personalizable, ideal para audio y activaciones de marca.",
    descripcionLarga: "Auriculares bluetooth i7mini de alta calidad, disponible en 3 colores. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    modalidades: {
      importacion: { precios: { 100: 18.42, 500: null, 1000: 17.91 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: ["Blanco", "Negro", "beige"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: false,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889043/ardy-import/productos/auriculares-bluetooth-i7mini/foto-1.jpg", alt: "Auriculares bluetooth i7mini, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889048/ardy-import/productos/auriculares-bluetooth-i7mini/foto-2.jpg", alt: "Auriculares bluetooth i7mini, detalle de textura." },
    ],
    seoTitle: "Auriculares Bluetooth I7mini personalizada | ARDY Import",
    seoMeta: "MOQ 100 unidades. 3 colores. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "auriculares bluetooth i7mini personalizada",
    fechaActualizacion: "2026-09-08",
  },
  {
    id: 21,
    slug: "auriculares-bluetooth-x7",
    slugsAnteriores: [],
    nombre: "Auriculares bluetooth x7",
    categoria: "Tecnología",
    descripcionCorta: "Auriculares bluetooth x7, personalizable, ideal para audio y activaciones de marca.",
    descripcionLarga: "Auriculares bluetooth x7 de alta calidad, disponible en 2 colores. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 120 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 120,
    modalidades: {
      importacion: { precios: { 100: 28.57, 500: 27.51, 1000: 27.24 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: ["Negro", "Blanco"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889052/ardy-import/productos/auriculares-bluetooth-x7/foto-1.jpg", alt: "Auriculares bluetooth x7, vista frontal." },
    ],
    seoTitle: "Auriculares Bluetooth X7 personalizada | ARDY Import",
    seoMeta: "MOQ 120 unidades. 2 colores. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "auriculares bluetooth x7 personalizada",
    fechaActualizacion: "2026-09-08",
  },
  {
    id: 22,
    slug: "mini-altavoz-inalambrico-portatil",
    slugsAnteriores: [],
    nombre: "Mini altavoz inalámbrico portátil",
    categoria: "Tecnología",
    descripcionCorta: "Mini altavoz inalámbrico portátil, personalizable, ideal para audio y activaciones de marca.",
    descripcionLarga: "Mini altavoz inalámbrico portátil de alta calidad, disponible en 4 colores y 1 tallas (Tamaño: 4.5 cm x 4.7 cm). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    modalidades: {
      importacion: { precios: { 100: 19.24, 500: 18.36, 1000: 18.18 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: ["Blanco", "Negro", "Verde", "Naranja"],
    tallas: ["Tamaño: 4.5 cm x 4.7 cm"],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: true,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889057/ardy-import/productos/mini-altavoz-inalambrico-portatil/foto-1.jpg", alt: "Mini altavoz inalámbrico portátil, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889062/ardy-import/productos/mini-altavoz-inalambrico-portatil/foto-2.jpg", alt: "Mini altavoz inalámbrico portátil, detalle de textura." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889067/ardy-import/productos/mini-altavoz-inalambrico-portatil/foto-3.jpg", alt: "Mini altavoz inalámbrico portátil, vista lateral." },
    ],
    seoTitle: "Mini Altavoz Inalámbrico Portátil | ARDY Import",
    seoMeta: "MOQ 100 unidades. 4 colores, 1 tallas. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "mini altavoz inalambrico portatil personalizada",
    fechaActualizacion: "2026-09-08",
  },
  {
    id: 23,
    slug: "power-bank-fibra-de-trigo-5000-mah",
    slugsAnteriores: [],
    nombre: "Power bank fibra de trigo 5000 mah",
    categoria: "Tecnología",
    descripcionCorta: "Power bank fibra de trigo 5000 mah, personalizable, ideal para ejecutivos y activaciones de marca.",
    descripcionLarga: "Power bank fibra de trigo 5000 mah de alta calidad, disponible en 1 colores. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 50 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 50,
    modalidades: {
      importacion: { precios: { 100: 45.17, 500: 44.31, 1000: 43.88 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: ["SERIGRAFÍA"],
    areaMarcado: "[SIN_DATO]",
    colores: ["Natural"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: false,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889072/ardy-import/productos/power-bank-fibra-de-trigo-5000-mah/foto-1.jpg", alt: "Power bank fibra de trigo 5000 mah, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889076/ardy-import/productos/power-bank-fibra-de-trigo-5000-mah/foto-2.jpg", alt: "Power bank fibra de trigo 5000 mah, detalle de textura." },
    ],
    seoTitle: "Power Bank Fibra de Trigo 5000 Mah | ARDY Import",
    seoMeta: "MOQ 50 unidades. 1 colores. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "power bank fibra de trigo 5000 mah personalizada",
    fechaActualizacion: "2026-09-07",
  },
  {
    id: 24,
    slug: "bateria-externa-biodegradable-de-corcho-y-fibra-de-trigo-10000-mah",
    slugsAnteriores: [],
    nombre: "Batería externa biodegradable de corcho y fibra de trigo 10000 mah",
    categoria: "Eco & Sostenibilidad",
    descripcionCorta: "Batería externa biodegradable de corcho y fibra de trigo 10000 mah, personalizable, ideal para ejecutivos.",
    descripcionLarga: "Batería externa biodegradable de corcho y fibra de trigo 10000 mah de alta calidad. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 50 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 50,
    modalidades: {
      importacion: { precios: { 100: 72.02, 500: 71.32, 1000: 70.62 } },
      nacionalizado: null,
    },
    material: "[SIN_DATO]",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: [],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889082/ardy-import/productos/bateria-externa-biodegradable-de-corcho-y-fibra-de-trigo-10000-mah/foto-1.jpg", alt: "Batería externa biodegradable de corcho y fibra de trigo 10000 mah, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889086/ardy-import/productos/bateria-externa-biodegradable-de-corcho-y-fibra-de-trigo-10000-mah/foto-2.jpg", alt: "Batería externa biodegradable de corcho y fibra de trigo 10000 mah, detalle de textura." },
    ],
    seoTitle: "Batería Externa Biodegradable de Corcho y Fibra de Trigo ...",
    seoMeta: "MOQ 50 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "bateria externa biodegradable de corcho y fibra de trigo 10000 mah personalizada",
    fechaActualizacion: "2026-09-07",
  },
  {
    id: 25,
    slug: "botella-de-agua-para-mascotas",
    slugsAnteriores: [],
    nombre: "Botella de agua para mascotas",
    categoria: "Mascotas",
    descripcionCorta: "Botella de agua para mascotas de plástico y silicona, personalizable, ideal para mascotas y activaciones de marca.",
    descripcionLarga: "Botella de agua para mascotas de plástico y silicona de alta calidad, disponible en 3 colores y 1 tallas (Tamaño: 9 x 8.7 cm). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 150 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 150,
    modalidades: {
      importacion: { precios: { 100: 22.95, 500: 21.66, 1000: 19.28 } },
      nacionalizado: null,
    },
    material: "Plástico y silicona",
    tecnicas: [],
    areaMarcado: "[SIN_DATO]",
    colores: ["Lila", "Rosado", "Celeste"],
    tallas: ["Tamaño: 9 x 8.7 cm"],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889091/ardy-import/productos/botella-de-agua-para-mascotas/foto-1.jpg", alt: "Botella de agua para mascotas de plástico y silicona en varios colores, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889096/ardy-import/productos/botella-de-agua-para-mascotas/foto-2.jpg", alt: "Botella de agua para mascotas de plástico y silicona, detalle de textura y acabado." },
    ],
    seoTitle: "Botella de Agua para Mascotas personalizada | ARDY Import",
    seoMeta: "MOQ 150 unidades. 3 colores, 1 tallas. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "botella de agua para mascotas personalizada",
    fechaActualizacion: "2026-09-06",
  },
  {
    id: 26,
    slug: "set-de-boligrafos-de-alta-gama",
    slugsAnteriores: [],
    nombre: "Set de bolígrafos de alta gama",
    categoria: "Escritura",
    descripcionCorta: "Set de bolígrafos de alta gama de acero inoxidable, personalizable, ideal para escritura y activaciones de marca.",
    descripcionLarga: "Set de bolígrafos de alta gama de acero inoxidable de alta calidad, disponible en 4 colores y 1 tallas (Peso: 260 gramos). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Mínimo de compra: 60 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 60,
    modalidades: {
      importacion: { precios: { 100: 49.29, 500: 47.32, 1000: 45.34 } },
      nacionalizado: null,
    },
    material: "Acero inoxidable",
    tecnicas: ["LÁSER, SERIGRAFIA"],
    areaMarcado: "[SIN_DATO]",
    colores: ["Negro", "Rojo", "Azul", "Blanco"],
    tallas: ["Peso: 260 gramos"],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: true,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889101/ardy-import/productos/set-de-boligrafos-de-alta-gama/foto-1.jpg", alt: "Set de bolígrafos de alta gama de acero inoxidable en varios colores, vista frontal." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889107/ardy-import/productos/set-de-boligrafos-de-alta-gama/foto-2.jpg", alt: "Set de bolígrafos de alta gama de acero inoxidable, detalle de textura y acabado." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889112/ardy-import/productos/set-de-boligrafos-de-alta-gama/foto-3.jpg", alt: "Set de bolígrafos de alta gama, vista lateral." },
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889117/ardy-import/productos/set-de-boligrafos-de-alta-gama/foto-4.jpg", alt: "Set de bolígrafos de alta gama mostrando tallas disponibles: Peso: 260 gramos." },
    ],
    seoTitle: "Set de Bolígrafos de Alta Gama personalizada | ARDY Import",
    seoMeta: "Set de bolígrafos de alta gama de acero inoxidable personalizable con Láser, serigrafia. MOQ 60 unidades. 4 colores, 1 tallas. Plazo 3 semanas en blanco. Pid...",
    palabraClave: "set de boligrafos de alta gama personalizada",
    fechaActualizacion: "2026-09-06",
  },
  {
    id: 27,
    slug: "placa-de-identificacion-para-gatos",
    slugsAnteriores: [],
    nombre: "Placa de identificación para gatos",
    categoria: "Mascotas",
    descripcionCorta: "Placa de identificación para gatos de acero inoxidable, personalizable, ideal para metal y activaciones de marca.",
    descripcionLarga: "Placa de identificación para gatos de acero inoxidable de alta calidad, disponible en 4 colores y 2 tallas (Tamaño 2.8 cm x 2.8cm, Espesor 1.7 mm). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite Láser, serigrafia, con área de marcado de 2 x 2 cm. Mínimo de compra: 50 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 50,
    modalidades: {
      importacion: { precios: { 100: 3.15, 500: null, 1000: 2.63 } },
      nacionalizado: null,
    },
    material: "Acero inoxidable",
    tecnicas: ["LÁSER, SERIGRAFIA"],
    areaMarcado: "2 x 2",
    colores: ["Negro", "Azul", "Plata", "Dorado"],
    tallas: ["Tamaño 2.8 cm x 2.8cm", "Espesor 1.7 mm"],
    disponibilidad: "En stock",
    permisoMtc: "No",
    esNovedad: true,
    destacado: false,
    fotos: [
      { url: "https://res.cloudinary.com/tw3hi0pz/image/upload/v1788889122/ardy-import/productos/placa-de-identificacion-para-gatos/foto-1.jpg", alt: "Placa de identificación para gatos de acero inoxidable en varios colores, vista frontal." },
    ],
    seoTitle: "Placa de Identificación para Gatos | ARDY Import",
    seoMeta: "Placa de identificación para gatos de acero inoxidable personalizable con Láser, serigrafia. MOQ 50 unidades. 4 colores, 2 tallas. Plazo 3 semanas en blanco....",
    palabraClave: "placa de identificacion para gatos personalizada",
    fechaActualizacion: "2026-09-06",
  },
];
