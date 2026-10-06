import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("..", import.meta.url);
const productos = await readFile(new URL("src/data/productos.ts", root), "utf8");
const ficha = await readFile(new URL("src/components/producto/FichaProducto.tsx", root), "utf8");

function preciosDelProducto(slug) {
  const inicio = productos.indexOf(`slug: "${slug}"`);
  assert.notEqual(inicio, -1, `Producto no encontrado: ${slug}`);
  const bloque = productos.slice(inicio, inicio + 1600);
  const precios = {};
  for (const escala of [50, 100, 500, 1000]) {
    const match = bloque.match(new RegExp(`\\b${escala}: (null|[0-9.]+)`));
    if (match) precios[escala] = match[1] === "null" ? null : Number(match[1]);
  }
  return precios;
}

test("Importacion conserva las tres escalas publicadas", () => {
  const precios = preciosDelProducto("bandana-para-mascotas");
  assert.deepEqual(
    { 100: precios[100], 500: precios[500], 1000: precios[1000] },
    { 100: 2.45, 500: 2.33, 1000: 2.29 },
  );
});

test("Nacionalizado conserva las tres escalas publicadas", () => {
  const precios = preciosDelProducto("libreta-natura");
  assert.deepEqual(
    { 50: precios[50], 100: precios[100], 500: precios[500] },
    { 50: 8.58, 100: 6.69, 500: 6.06 },
  );
});

test("La ficha usa el precio propio de cada escala y no el seleccionado", () => {
  assert.match(ficha, /preciosPorCantidad=\{producto\.modalidades\.importacion!\.precios\}/);
  assert.match(ficha, /preciosPorCantidad=\{producto\.modalidades\.nacionalizado!\.precios\}/);
  assert.match(ficha, /preciosPorCantidad\[c as 50 \| 100 \| 500 \| 1000\]/);
  assert.doesNotMatch(ficha, /: preciosPorCantidad \? [^:]+: precioUnitario/);
  assert.match(ficha, /Desde \{formatPrecio\(precioDesde!\)\}/);
});
