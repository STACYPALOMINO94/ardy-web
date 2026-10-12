import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
const registry = JSON.parse(fs.readFileSync('src/data/product-skus.json','utf8'));
const catalogueSource = fs.readFileSync('src/data/productos.ts','utf8');
const products = vm.runInNewContext('(' + catalogueSource.match(/export\s+const\s+productos\s*(?::[^=]+)?=\s*(\[[\s\S]*\]);?\s*$/)[1] + ')');
const source = fs.readFileSync('src/lib/product-sku.ts','utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop:true } }).outputText;
const sandbox = { exports:{}, require: name => { assert.equal(name, '@/data/product-skus.json'); return registry; } };
vm.runInNewContext(compiled, sandbox);
const { getSku, hasNationalStock } = sandbox.exports;

test('cada producto publicado tiene un SKU único y persistente', () => {
  const codes = products.map(getSku);
  assert.equal(codes.length, 20);
  assert.equal(new Set(codes).size, products.length);
  for (const p of products) {
    assert.ok(registry[p.slug], 'Falta registro persistente para ' + p.slug);
    assert.equal(getSku({ ...p, id:9999 }), getSku(p));
    assert.equal(getSku({ slug:'nuevo-nombre', slugsAnteriores:[p.slug] }), getSku(p));
  }
});
test('conserva los códigos ARDY reales y distingue el catálogo antiguo', () => {
  assert.equal(getSku({ slug:'placa-antiperdida-para-mascotas', slugsAnteriores:[] }), 'ARDY-051');
  assert.equal(getSku({ slug:'abrebotellas-de-madera-maciza', slugsAnteriores:[] }), 'ARDY-042');
  assert.equal(getSku({ slug:'bandana-para-mascotas', slugsAnteriores:[] }), 'ARDY-WEB-001');
  assert.equal(getSku({ slug:'otro-producto', slugsAnteriores:[] }), 'ARDY-WEB-OTRO-PRODUCTO');
});
test('stock corresponde a Nacionalizado incluso si coexiste con Importación', () => {
  assert.equal(products.filter(hasNationalStock).length, 6);
  for (const p of products) assert.equal(hasNationalStock(p), p.modalidades.nacionalizado !== null);
  assert.equal(hasNationalStock({ modalidades:{ importacion:{}, nacionalizado:{} } }), true);
  assert.equal(hasNationalStock({ modalidades:{ importacion:{}, nacionalizado:null } }), false);
});
