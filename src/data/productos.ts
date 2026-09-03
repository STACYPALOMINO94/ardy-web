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

export interface Producto {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  descripcionCorta: string;
  descripcionLarga: string;
  moq: number;
  precios: {
    100: number;
    300: number;
    500: number;
    1000: number;
  };
  material: string;
  tecnicas: string[];
  areaMarcado: string;
  colores: string[];
  tallas: string[];
  disponibilidad: string;
  permisoMtc: boolean;
  esNovedad: boolean;
  fotos: Array<{ url: string; alt: string }>;
  seoTitle: string;
  seoMeta: string;
  palabraClave: string;
  fechaActualizacion: string;
}

export const productos: Producto[] = [
  {
    id: 1,
    slug: "pin-metalico-esmaltado",
    nombre: "Pin metálico esmaltado",
    categoria: "Pines",
    descripcionCorta: "Pin metálico esmaltado, personalizable, ideal para eventos y activaciones de marca.",
    descripcionLarga:
      "Pin metálico esmaltado de zamak de alta calidad, disponible en 3 tonos. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite esmalte y grabado láser, con área de marcado de 3 x 3 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 9.9, 300: 8.4, 500: 7.6, 1000: 6.5 },
    material: "Zamak con esmalte",
    tecnicas: ["ESMALTE", "GRABADO LASER"],
    areaMarcado: "3 x 3",
    colores: ["Dorado", "Níquel", "Negro"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Pin metálico esmaltado personalizado | ARDY Import",
    seoMeta:
      "Pin metálico esmaltado de zamak personalizable con esmalte y grabado láser. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "pin metalico esmaltado personalizado",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 2,
    slug: "medalla-de-reconocimiento",
    nombre: "Medalla de reconocimiento",
    categoria: "Pines",
    descripcionCorta: "Medalla de reconocimiento en aleación de zinc, con cinta incluida y relieve a dos caras.",
    descripcionLarga:
      "Medalla de reconocimiento de aleación de zinc de alta calidad, disponible en 3 tonos, con cinta incluida y relieve a dos caras. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite relieve y esmalte, con área de marcado de 5 x 5 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 14.9, 300: 12.9, 500: 11.5, 1000: 9.9 },
    material: "Aleación de zinc",
    tecnicas: ["RELIEVE", "ESMALTE"],
    areaMarcado: "5 x 5",
    colores: ["Dorado", "Plata", "Negro"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Medalla de reconocimiento personalizada | ARDY Import",
    seoMeta:
      "Medalla de reconocimiento personalizada en aleación de zinc, con cinta incluida. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "medalla de reconocimiento personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 3,
    slug: "moneda-conmemorativa",
    nombre: "Moneda conmemorativa",
    categoria: "Pines",
    descripcionCorta: "Moneda conmemorativa a doble cara, acabado antiguo o pulido, estuche individual opcional.",
    descripcionLarga:
      "Moneda conmemorativa de zamak de alta calidad, disponible en 3 tonos, con acabado antiguo o pulido. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite relieve y esmalte, con área de marcado de 4 x 4 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 12.9, 300: 10.9, 500: 9.5, 1000: 7.9 },
    material: "Zamak",
    tecnicas: ["RELIEVE", "ESMALTE"],
    areaMarcado: "4 x 4",
    colores: ["Dorado", "Níquel", "Negro"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: true,
    fotos: [],
    seoTitle: "Moneda conmemorativa personalizada | ARDY Import",
    seoMeta:
      "Moneda conmemorativa personalizada en zamak, acabado antiguo o pulido. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "moneda conmemorativa personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 4,
    slug: "llavero-metalico",
    nombre: "Llavero metálico",
    categoria: "Llaveros",
    descripcionCorta: "Llavero de metal macizo con argolla reforzada, con stock disponible en Perú.",
    descripcionLarga:
      "Llavero metálico macizo de alta calidad, disponible en 3 tonos, con argolla reforzada. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 3 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 8.9, 300: 7.4, 500: 6.5, 1000: 5.4 },
    material: "Metal macizo",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "3 x 2",
    colores: ["Níquel", "Dorado", "Negro"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Llavero metálico personalizado | ARDY Import",
    seoMeta:
      "Llavero metálico personalizado con argolla reforzada. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "llavero metalico personalizado",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 5,
    slug: "insignia-metalica-de-solapa",
    nombre: "Insignia metálica de solapa",
    categoria: "Pines",
    descripcionCorta: "Insignia de formato pequeño para uniforme corporativo y protocolo institucional.",
    descripcionLarga:
      "Insignia metálica de solapa de zamak de alta calidad, disponible en 3 tonos, en formato pequeño. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite esmalte y relieve, con área de marcado de 2 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 8.4, 300: 7.1, 500: 6.3, 1000: 5.2 },
    material: "Zamak con esmalte",
    tecnicas: ["ESMALTE", "RELIEVE"],
    areaMarcado: "2 x 2",
    colores: ["Dorado", "Níquel", "Azul marino"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Insignia metálica de solapa personalizada | ARDY Import",
    seoMeta:
      "Insignia metálica de solapa para uniforme corporativo y protocolo. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "insignia metalica de solapa personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 6,
    slug: "memoria-usb-metalica",
    nombre: "Memoria USB metálica",
    categoria: "USB",
    descripcionCorta: "Memoria USB con carcasa de metal y capucha, en varias capacidades de almacenamiento.",
    descripcionLarga:
      "Memoria USB metálica de alta calidad, disponible en 3 tonos y varias capacidades. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser y tampografía, con área de marcado de 2 x 1 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 24.9, 300: 21.9, 500: 19.5, 1000: 16.9 },
    material: "Metal con capucha",
    tecnicas: ["GRABADO LASER", "TAMPOGRAFIA"],
    areaMarcado: "2 x 1",
    colores: ["Níquel", "Negro", "Dorado"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Memoria USB metálica personalizada | ARDY Import",
    seoMeta:
      "Memoria USB personalizada para evento, carcasa de metal. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "memoria usb personalizada para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 7,
    slug: "power-bank-slim",
    nombre: "Power bank slim",
    categoria: "Tecnología",
    descripcionCorta: "Power bank de cuerpo de aluminio, carga por cable, sin conectividad inalámbrica.",
    descripcionLarga:
      "Power bank slim de aluminio de alta calidad, disponible en 3 tonos, sin conectividad inalámbrica. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 4 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 54.9, 300: 48.9, 500: 43.5, 1000: 37.9 },
    material: "Aluminio",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "4 x 2",
    colores: ["Negro", "Plata", "Azul marino"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Power bank slim personalizado | ARDY Import",
    seoMeta:
      "Power bank slim de aluminio, carga por cable, sin RF. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "power bank personalizado para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 8,
    slug: "cable-multipuerto-3-en-1",
    nombre: "Cable multipuerto 3 en 1",
    categoria: "Tecnología",
    descripcionCorta: "Cable trenzado USB-C, Lightning y micro USB en un solo accesorio personalizable.",
    descripcionLarga:
      "Cable multipuerto 3 en 1 trenzado de alta calidad, disponible en 3 tonos. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite tampografía en el conector, con área de marcado de 1 x 1 cm. Bajo producción: consulta nuestros tiempos exactos de fabricación.",
    moq: 100,
    precios: { 100: 19.9, 300: 16.9, 500: 14.9, 1000: 12.5 },
    material: "Nailon trenzado",
    tecnicas: ["TAMPOGRAFIA"],
    areaMarcado: "1 x 1",
    colores: ["Negro", "Azul marino", "Verde oliva"],
    tallas: [],
    disponibilidad: "Bajo producción",
    permisoMtc: false,
    esNovedad: true,
    fotos: [],
    seoTitle: "Cable multipuerto 3 en 1 personalizado | ARDY Import",
    seoMeta:
      "Cable multipuerto USB-C, Lightning y micro USB personalizable. MOQ 100 unidades. Bajo producción. Pide cotización.",
    palabraClave: "cable multipuerto personalizado para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 9,
    slug: "tarjeta-nfc-personalizable",
    nombre: "Tarjeta NFC personalizable",
    categoria: "Tecnología",
    descripcionCorta: "Tarjeta NFC en PVC o metal con chip programable para presentación digital.",
    descripcionLarga:
      "Tarjeta NFC personalizable de PVC o metal de alta calidad, disponible en 3 tonos, con chip programable. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser e impresión, con área de marcado de 8 x 5 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 29.9, 300: 25.9, 500: 22.9, 1000: 18.9 },
    material: "PVC o metal",
    tecnicas: ["GRABADO LASER", "IMPRESION"],
    areaMarcado: "8 x 5",
    colores: ["Negro", "Dorado", "Azul marino"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: true,
    fotos: [],
    seoTitle: "Tarjeta NFC personalizable | ARDY Import",
    seoMeta:
      "Tarjeta NFC con chip programable para presentación digital. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "tarjeta nfc personalizada para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 10,
    slug: "parlante-bluetooth-compacto",
    nombre: "Parlante Bluetooth compacto",
    categoria: "Audio",
    descripcionCorta: "Parlante Bluetooth compacto, sin cables, no requiere permiso MTC en Perú.",
    descripcionLarga:
      "Parlante Bluetooth compacto de alta calidad, disponible en 3 tonos. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite tampografía, con área de marcado de 4 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela. La conectividad es Bluetooth: no requiere permiso de internamiento MTC.",
    moq: 100,
    precios: { 100: 34.9, 300: 29.9, 500: 26.5, 1000: 22.9 },
    material: "Plástico ABS",
    tecnicas: ["TAMPOGRAFIA"],
    areaMarcado: "4 x 2",
    colores: ["Negro", "Azul marino", "Verde oliva"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Parlante Bluetooth compacto personalizado | ARDY Import",
    seoMeta:
      "Parlante Bluetooth compacto, sin permiso MTC. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "parlante bluetooth personalizado para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 11,
    slug: "audifonos-cableados",
    nombre: "Audífonos cableados",
    categoria: "Audio",
    descripcionCorta: "Audífonos con cable, sin radio, no requieren permiso de internamiento MTC.",
    descripcionLarga:
      "Audífonos cableados de alta calidad, disponibles en 3 tonos, con cable y sin radio. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite tampografía, con área de marcado de 2 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 17.9, 300: 15.4, 500: 13.5, 1000: 11.4 },
    material: "Plástico ABS",
    tecnicas: ["TAMPOGRAFIA"],
    areaMarcado: "2 x 2",
    colores: ["Negro", "Azul marino", "Plata"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Audífonos cableados personalizados | ARDY Import",
    seoMeta:
      "Audífonos cableados personalizados, sin permiso MTC. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "audifonos personalizados para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 12,
    slug: "parlante-cableado-de-escritorio",
    nombre: "Parlante cableado de escritorio",
    categoria: "Audio",
    descripcionCorta: "Parlante de escritorio por cable, entra con el plazo estándar de aduana.",
    descripcionLarga:
      "Parlante cableado de escritorio de alta calidad, disponible en 3 tonos, con conexión por cable. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite tampografía, con área de marcado de 4 x 3 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 27.9, 300: 23.9, 500: 20.9, 1000: 17.5 },
    material: "Plástico ABS",
    tecnicas: ["TAMPOGRAFIA"],
    areaMarcado: "4 x 3",
    colores: ["Negro", "Plata", "Azul marino"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Parlante cableado de escritorio personalizado | ARDY Import",
    seoMeta:
      "Parlante cableado de escritorio, entra con plazo estándar de aduana. MOQ 100 unidades. Pide cotización.",
    palabraClave: "parlante de escritorio personalizado para evento",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 13,
    slug: "pluma-metalica-premium",
    nombre: "Pluma metálica premium",
    categoria: "Ejecutivos",
    descripcionCorta: "Pluma de cuerpo de latón con estuche individual, regalo de directorio.",
    descripcionLarga:
      "Pluma metálica premium de latón de alta calidad, disponible en 3 tonos, con estuche individual. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 4 x 0.5 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 22.9, 300: 19.4, 500: 17.5, 1000: 14.9 },
    material: "Latón",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "4 x 0.5",
    colores: ["Dorado", "Negro", "Plata"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Pluma metálica premium personalizada | ARDY Import",
    seoMeta:
      "Pluma metálica premium con estuche individual, regalo de directorio. MOQ 100 unidades. Pide cotización.",
    palabraClave: "pluma metalica premium personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 14,
    slug: "tarjetero-de-metal",
    nombre: "Tarjetero de metal",
    categoria: "Ejecutivos",
    descripcionCorta: "Tarjetero de aluminio anodizado con apertura automática, ejecutivo.",
    descripcionLarga:
      "Tarjetero de metal de aluminio anodizado de alta calidad, disponible en 3 tonos, con apertura automática. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 5 x 3 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 16.9, 300: 14.4, 500: 12.9, 1000: 10.9 },
    material: "Aluminio anodizado",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "5 x 3",
    colores: ["Plata", "Negro", "Dorado"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [],
    seoTitle: "Tarjetero de metal personalizado | ARDY Import",
    seoMeta:
      "Tarjetero de aluminio anodizado con apertura automática. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "tarjetero de metal personalizado",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 15,
    slug: "set-de-escritorio-metalico",
    nombre: "Set de escritorio metálico",
    categoria: "Ejecutivos",
    descripcionCorta: "Pluma, portanotas y organizador metálicos en caja rígida, regalo corporativo.",
    descripcionLarga:
      "Set de escritorio metálico de alta calidad, disponible en 3 tonos, con pluma, portanotas y organizador en caja rígida. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 5 x 2 cm. Bajo producción: consulta nuestros tiempos exactos de fabricación.",
    moq: 100,
    precios: { 100: 44.9, 300: 38.9, 500: 34.5, 1000: 29.9 },
    material: "Metal con caja rígida",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "5 x 2",
    colores: ["Azul marino", "Negro", "Dorado"],
    tallas: [],
    disponibilidad: "Bajo producción",
    permisoMtc: false,
    esNovedad: true,
    fotos: [],
    seoTitle: "Set de escritorio metálico personalizado | ARDY Import",
    seoMeta:
      "Set de escritorio metálico con pluma y organizador, regalo corporativo. MOQ 100 unidades. Pide cotización.",
    palabraClave: "set de escritorio metalico personalizado",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 16,
    slug: "placa-identificadora-para-mascota",
    nombre: "Placa identificadora para mascota",
    categoria: "Mascotas",
    descripcionCorta: "Placa de acero inoxidable con grabado a dos caras, para campañas pet friendly.",
    descripcionLarga:
      "Placa identificadora para mascota de acero inoxidable de alta calidad, disponible en 3 tonos, con grabado a dos caras. Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite grabado láser, con área de marcado de 3 x 2 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 7.9, 300: 6.4, 500: 5.6, 1000: 4.5 },
    material: "Acero inoxidable",
    tecnicas: ["GRABADO LASER"],
    areaMarcado: "3 x 2",
    colores: ["Plata", "Dorado", "Verde oliva"],
    tallas: [],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: true,
    fotos: [],
    seoTitle: "Placa identificadora para mascota personalizada | ARDY Import",
    seoMeta:
      "Placa para mascota en acero inoxidable, grabado a dos caras. MOQ 100 unidades. Ideal para campañas pet. Pide cotización.",
    palabraClave: "placa identificadora para mascota personalizada",
    fechaActualizacion: "2026-09-02",
  },
  {
    id: 17,
    slug: "bandana-para-mascotas",
    nombre: "Bandana para mascotas",
    categoria: "Mascotas",
    descripcionCorta:
      "Bandana para mascotas de poliéster, personalizable, ideal para mascotas y activaciones de marca.",
    descripcionLarga:
      "Bandana para mascotas de Poliéster de alta calidad, disponible en 6 colores y 3 tallas (S, M, L). Ideal para activaciones de marca, eventos corporativos y regalos promocionales. Admite DTF textil y serigrafía, con área de marcado de 10 x 10 cm. Mínimo de compra: 100 unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.",
    moq: 100,
    precios: { 100: 2.45, 300: 2.39, 500: 2.33, 1000: 2.29 },
    material: "Poliéster",
    tecnicas: ["DTF TEXTIL", "SERIGRAFIA"],
    areaMarcado: "10 x 10",
    colores: ["Rojo", "Negro", "Azul", "Blanco", "Verde", "Naranja"],
    tallas: ["S", "M", "L"],
    disponibilidad: "En stock",
    permisoMtc: false,
    esNovedad: false,
    fotos: [
      {
        url: "https://cbu01.alicdn.com/img/ibank/O1CN01yTGNc01efKfxlsIdp_!!2207981393898-0-cib.jpg",
        alt: "Bandana para mascotas de Poliéster en varios colores, vista frontal.",
      },
      {
        url: "https://cbu01.alicdn.com/img/ibank/O1CN016vDviD1efKg6fBql3_!!2207981393898-0-cib.jpg",
        alt: "Bandana para mascotas de Poliéster, detalle de textura y acabado.",
      },
      {
        url: "https://cbu01.alicdn.com/img/ibank/O1CN01u98EA51efKg8EBYVn_!!2207981393898-0-cib.jpg",
        alt: "Bandana para mascotas con marcado en área de 10 x 10 cm, vista de personalización.",
      },
      {
        url: "https://cbu01.alicdn.com/img/ibank/O1CN01aG3MR51efKg75PiNX_!!2207981393898-0-cib.jpg",
        alt: "Bandana para mascotas mostrando tallas disponibles: S, M, L.",
      },
    ],
    seoTitle: "Bandana para mascotas personalizada | ARDY Import",
    seoMeta:
      "Bandana para mascotas de poliéster personalizable con DTF textil y serigrafía. MOQ 100 unidades. Plazo 3 semanas en blanco. Pide cotización.",
    palabraClave: "bandana para mascotas personalizada",
    fechaActualizacion: "2026-09-02",
  },
];
