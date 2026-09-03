/**
 * procesar-catalogo.mjs
 *
 * Replica la lógica de la skill ardy-catalogo-web.
 * Lee un JSON con productos de 24 campos y genera/actualiza src/data/productos.ts.
 *
 * MERGE INTELIGENTE:
 * - Si el slug ya existe en productos.ts → lo reemplaza (versión corregida)
 * - Si el slug es nuevo → lo agrega
 * - Sin duplicados. Cada producto existe una sola vez.
 * - Después de procesar, renombra el JSON a _DONE_ para no reprocesarlo.
 *
 * Uso: node scripts/procesar-catalogo.mjs src/data/raw/productos_procesados_xxx.json
 */

import { readFileSync, writeFileSync, renameSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(ROOT, "src/data/productos.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** "BANDANA PARA MASCOTAS" → "Bandana para mascotas" */
function toSentenceCase(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** "BANDANA PARA MASCOTAS" → "Bandana Para Mascotas" */
function toTitleCase(str) {
  if (!str) return str;
  const lower = ["de", "del", "la", "las", "los", "el", "en", "con", "para", "por", "y", "a"];
  return str
    .split(" ")
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i > 0 && lower.includes(lw)) return lw;
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(" ");
}

function splitCSV(value) {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitTecnicas(value) {
  if (!value) return [];
  return value
    .split(/\s*-\s*/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

function formatTecnica(t) {
  // DTF TEXTIL → DTF textil, SERIGRAFIA → serigrafía
  const map = {
    SERIGRAFIA: "serigrafía",
    "SERIGRAFÍA": "serigrafía",
    "DTF TEXTIL": "DTF textil",
    "DTF": "DTF",
    SUBLIMACION: "sublimación",
    "SUBLIMACIÓN": "sublimación",
    BORDADO: "bordado",
    GRABADO: "grabado",
    "TAMPOGRAFIA": "tampografía",
    "TAMPOGRAFÍA": "tampografía",
    "LASER": "láser",
    "LÁSER": "láser",
  };
  return map[t.toUpperCase()] || toSentenceCase(t);
}

function parseTallas(value) {
  if (!value || typeof value !== "string") return [];
  const tallaMatches = value.match(/talla\s+(\w+)/gi);
  if (tallaMatches && tallaMatches.length > 0) {
    return tallaMatches.map((m) => m.replace(/talla\s+/i, "").trim());
  }
  return splitCSV(value);
}

function parseFecha(fecha) {
  if (!fecha) return new Date().toISOString().slice(0, 10);
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function toBool(val) {
  if (typeof val === "boolean") return val;
  if (typeof val === "string")
    return ["sí", "si", "true"].includes(val.toLowerCase());
  return false;
}

// ---------------------------------------------------------------------------
// Generadores de contenido
// ---------------------------------------------------------------------------

function generarDescripcionCorta(p) {
  const nombre = toSentenceCase(p.Nombre || "[SIN_DATO]");
  const material = (p.Material || "").toLowerCase();
  const categoria = (p.Categoria || p["Categoría"] || "").toLowerCase();

  let desc = nombre;
  if (material) desc += ` de ${material}`;
  desc += ", personalizable";
  if (categoria) desc += `, ideal para ${categoria}`;
  desc += " y activaciones de marca.";

  // Limitar a ~15 palabras
  const words = desc.split(/\s+/);
  if (words.length > 18) {
    desc = words.slice(0, 15).join(" ") + ".";
  }
  return desc;
}

function generarDescripcionLarga(p) {
  const nombre = toSentenceCase(p.Nombre || "[SIN_DATO]");
  const material = (p.Material || "").toLowerCase();
  const colores = splitCSV(p.Colores || "");
  const tallas = parseTallas(p.Tallas || "");
  const tecnicas = splitTecnicas(p["Tecnicas de marcado"] || p["Técnicas de marcado"] || "");
  const area = p["Area de marcado"] || p["Área de marcado"] || "";
  const moq = p.MOQ || "";
  const disponibilidad = p.Disponibilidad || "";
  const permisoMtc = toBool(p["Permiso MTC"]);

  const frases = [];

  // Frase 1: Material y variantes
  let f1 = material
    ? `${nombre} de ${material} de alta calidad`
    : `${nombre} de alta calidad`;
  if (colores.length > 0) f1 += `, disponible en ${colores.length} colores`;
  if (tallas.length > 0) f1 += ` y ${tallas.length} tallas (${tallas.join(", ")})`;
  frases.push(f1 + ".");

  // Frase 2: Para qué sirve
  frases.push(
    "Ideal para activaciones de marca, eventos corporativos y regalos promocionales."
  );

  // Frase 3: Técnicas
  if (tecnicas.length > 0 && area) {
    const tecText = tecnicas.map(formatTecnica).join(" y ");
    frases.push(`Admite ${tecText}, con área de marcado de ${area} cm.`);
  }

  // Frase 4: MOQ y plazo
  if (moq) {
    frases.push(
      `Mínimo de compra: ${moq} unidades, plazo 15 a 17 días hábiles en blanco. Como el grabado es en Lima, el arte se aprueba mientras el producto vuela.`
    );
  }

  if (disponibilidad === "Bajo producción") {
    frases.push("Bajo producción. Consulta nuestros tiempos exactos.");
  }
  if (permisoMtc) {
    frases.push("Producto sujeto a permiso de internamiento MTC. Plazo incluye trámite.");
  }

  return frases.join(" ");
}

function generarSeoTitle(p) {
  const nombre = toTitleCase(p.Nombre || "[SIN_DATO]");
  let title = `${nombre} personalizada | ARDY Import`;
  if (title.length > 60) title = `${nombre} | ARDY Import`;
  if (title.length > 60) title = title.slice(0, 57) + "...";
  return title;
}

function generarSeoMeta(p) {
  const nombre = toSentenceCase(p.Nombre || "");
  const material = (p.Material || "").toLowerCase();
  const tecnicas = splitTecnicas(p["Tecnicas de marcado"] || p["Técnicas de marcado"] || "");
  const moq = p.MOQ || "";
  const colores = splitCSV(p.Colores || "");
  const tallas = parseTallas(p.Tallas || "");

  const partes = [];
  if (material && tecnicas.length > 0) {
    const tecText = tecnicas.map(formatTecnica).join(" y ");
    partes.push(`${nombre} de ${material} personalizable con ${tecText}.`);
  }
  if (moq) partes.push(`MOQ ${moq} unidades.`);

  const detalles = [];
  if (colores.length > 0) detalles.push(`${colores.length} colores`);
  if (tallas.length > 0) detalles.push(`${tallas.length} tallas`);
  if (detalles.length > 0) partes.push(detalles.join(", ") + ".");

  partes.push("Plazo 3 semanas en blanco. Pide cotización.");

  let meta = partes.join(" ");
  if (meta.length > 160) meta = meta.slice(0, 157) + "...";
  return meta;
}

function generarPalabraClave(p) {
  return toSlug(p.Nombre || "").replace(/-/g, " ") + " personalizada";
}

function generarAltTexts(p) {
  const nombre = toSentenceCase(p.Nombre || "Producto");
  const material = (p.Material || "").toLowerCase();
  const tallas = parseTallas(p.Tallas || "");
  const area = p["Area de marcado"] || p["Área de marcado"] || "";

  return [
    material
      ? `${nombre} de ${material} en varios colores, vista frontal.`
      : `${nombre}, vista frontal.`,
    material
      ? `${nombre} de ${material}, detalle de textura y acabado.`
      : `${nombre}, detalle de textura.`,
    area
      ? `${nombre} con marcado en área de ${area} cm, vista de personalización.`
      : `${nombre}, vista lateral.`,
    tallas.length > 0
      ? `${nombre} mostrando tallas disponibles: ${tallas.join(", ")}.`
      : `${nombre}, vista de empaque.`,
  ];
}

function parseFotos(p) {
  const fotos = [];
  const alts = generarAltTexts(p);
  for (let i = 1; i <= 4; i++) {
    const url = p[`Foto ${i}`];
    if (url) fotos.push({ url, alt: alts[i - 1] });
  }
  return fotos;
}

// ---------------------------------------------------------------------------
// Procesamiento
// ---------------------------------------------------------------------------

function procesarProducto(p) {
  const nombreOriginal = p.Nombre || "[SIN_DATO]";
  const slug = toSlug(nombreOriginal);
  // Normaliza a sentence-case (ej. "BANDANA PARA MASCOTAS" -> "Bandana para mascotas")
  // para que el nombre se vea bien como <h1>/<h3> sin importar cómo se escribió en el sheet.
  const nombre = toSentenceCase(nombreOriginal);

  return {
    slug,
    nombre,
    categoria: p.Categoria || p["Categoría"] || "[SIN_DATO]",
    descripcionCorta: generarDescripcionCorta(p),
    descripcionLarga: generarDescripcionLarga(p),
    moq: Number(p.MOQ) || 0,
    precios: {
      100: Number(p["Precio 100 uds (S/)"]) || 0,
      300: Number(p["Precio 300 uds (S/)"]) || 0,
      500: Number(p["Precio 500 uds (S/)"]) || 0,
      1000: Number(p["Precio 1000 uds (S/)"]) || 0,
    },
    material: p.Material || "[SIN_DATO]",
    tecnicas: splitTecnicas(p["Tecnicas de marcado"] || p["Técnicas de marcado"] || ""),
    areaMarcado: p["Area de marcado"] || p["Área de marcado"] || "[SIN_DATO]",
    colores: splitCSV(p.Colores || ""),
    tallas: parseTallas(p.Tallas || ""),
    disponibilidad: p.Disponibilidad || "En stock",
    permisoMtc: toBool(p["Permiso MTC"]),
    esNovedad: toBool(p.Novedad),
    fotos: parseFotos(p),
    seoTitle: generarSeoTitle(p),
    seoMeta: generarSeoMeta(p),
    palabraClave: generarPalabraClave(p),
    fechaActualizacion: parseFecha(p.Fecha),
  };
}

// ---------------------------------------------------------------------------
// Merge: lee productos.ts existente y combina por slug
// ---------------------------------------------------------------------------

// Encabezado por defecto si productos.ts todavía no existe (primera corrida del pipeline).
const ENCABEZADO_POR_DEFECTO = `/**
 * Catálogo de productos de ARDY Import.
 *
 * Este archivo se actualiza automáticamente vía el pipeline descrito en PROMPT.md
 * (CSV del cotizador → Google Apps Script → src/data/raw/*.json → GitHub Actions →
 * scripts/procesar-catalogo.mjs → este archivo → redeploy en Vercel).
 * NUNCA EDITAR A MANO en producción.
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

`;

// Coincide con "export const productos = [...]" y también con la variante tipada
// "export const productos: Producto[] = [...]" que usa el archivo real del proyecto.
const RE_DECLARACION_PRODUCTOS = /export\s+const\s+productos\s*(?::[^=]+)?=\s*(\[[\s\S]*\]);?\s*$/;

function leerEncabezadoYProductosExistentes() {
  if (!existsSync(OUTPUT_PATH)) {
    return { encabezado: ENCABEZADO_POR_DEFECTO, existentes: [] };
  }
  const content = readFileSync(OUTPUT_PATH, "utf-8");

  const match = content.match(RE_DECLARACION_PRODUCTOS);
  if (!match) {
    console.warn("No se encontró 'export const productos' en productos.ts, se creará desde cero.");
    return { encabezado: ENCABEZADO_POR_DEFECTO, existentes: [] };
  }

  const encabezado = content.slice(0, match.index);

  try {
    // Evaluar el array como JS (es seguro, es nuestro propio archivo).
    // El array en sí no usa sintaxis exclusiva de TypeScript, solo la declaración
    // que lo envuelve (ya excluida por el regex de arriba).
    const fn = new Function(`return ${match[1]}`);
    return { encabezado, existentes: fn() };
  } catch (err) {
    console.warn("No se pudo parsear productos.ts existente, se creará desde cero.", err);
    return { encabezado, existentes: [] };
  }
}

function mergeProductos(existentes, nuevos) {
  // Crear mapa por slug con los existentes
  const mapa = new Map();
  for (const p of existentes) {
    mapa.set(p.slug, p);
  }

  // Merge: nuevos reemplazan existentes con mismo slug
  let reemplazados = 0;
  let agregados = 0;
  for (const p of nuevos) {
    if (mapa.has(p.slug)) {
      reemplazados++;
      console.log(`  ↻ Reemplazado: ${p.nombre} (${p.slug})`);
    } else {
      agregados++;
      console.log(`  + Nuevo: ${p.nombre} (${p.slug})`);
    }
    mapa.set(p.slug, p);
  }

  console.log(`\nResumen merge: ${reemplazados} reemplazados, ${agregados} nuevos.`);

  // Convertir a array, reasignar IDs secuenciales
  const resultado = [...mapa.values()];
  resultado.forEach((p, i) => { p.id = i + 1; });
  return resultado;
}

// ---------------------------------------------------------------------------
// Generador TypeScript
// ---------------------------------------------------------------------------

function generarTS(productos) {
  function stringify(val, level = 0) {
    const pad = "  ".repeat(level);
    const padInner = "  ".repeat(level + 1);

    if (val === null || val === undefined) return "null";
    if (typeof val === "boolean") return val.toString();
    if (typeof val === "number") return val.toString();
    if (typeof val === "string") return JSON.stringify(val);

    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      if (typeof val[0] === "object") {
        const items = val
          .map((item) => {
            const entries = Object.entries(item)
              .map(([k, v]) => `${k}: ${stringify(v)}`)
              .join(", ");
            return `${padInner}{ ${entries} }`;
          })
          .join(",\n");
        return `[\n${items},\n${pad}]`;
      }
      return `[${val.map((v) => stringify(v)).join(", ")}]`;
    }

    if (typeof val === "object") {
      const entries = Object.entries(val);
      if (entries.length === 0) return "{}";
      const lines = entries
        .map(([k, v]) => `${padInner}${k}: ${stringify(v, level + 1)},`)
        .join("\n");
      return `{\n${lines}\n${pad}}`;
    }
    return String(val);
  }

  const items = productos.map((p) => {
    const lines = Object.entries(p)
      .map(([key, val]) => `    ${key}: ${stringify(val, 2)},`)
      .join("\n");
    return `  {\n${lines}\n  }`;
  });

  return `export const productos: Producto[] = [\n${items.join(",\n")},\n];\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Uso: node scripts/procesar-catalogo.mjs <ruta-al-json>");
  process.exit(1);
}

const resolvedInput = resolve(inputPath);
const raw = readFileSync(resolvedInput, "utf-8");
const data = JSON.parse(raw);

const productosRaw = data.productos || data;
const productosArray = Array.isArray(productosRaw) ? productosRaw : [productosRaw];

console.log(`\nProcesando ${productosArray.length} producto(s) desde ${basename(inputPath)}...\n`);

const nuevos = productosArray.map((p) => procesarProducto(p));

// Merge con existentes (preservando el encabezado/interfaz del archivo actual)
const { encabezado, existentes } = leerEncabezadoYProductosExistentes();
console.log(`Productos existentes en productos.ts: ${existentes.length}`);
const merged = mergeProductos(existentes, nuevos);

// Escribir
const tsContent = encabezado + generarTS(merged);
writeFileSync(OUTPUT_PATH, tsContent, "utf-8");
console.log(`\nTotal en productos.ts: ${merged.length} producto(s)`);

// Renombrar JSON a _DONE_
const dir = dirname(resolvedInput);
const name = basename(resolvedInput);
const doneName = name.replace("productos_procesados_", "productos_procesados_DONE_");
const donePath = resolve(dir, doneName);
renameSync(resolvedInput, donePath);
console.log(`JSON renombrado: ${name} → ${doneName}`);
