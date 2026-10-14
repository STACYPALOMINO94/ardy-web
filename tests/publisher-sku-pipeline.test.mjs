import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import ts from 'typescript';
const pipeline=fs.readFileSync('scripts/procesar-catalogo.mjs','utf8');
const catalogue=fs.readFileSync('src/data/productos.ts','utf8');
const products=vm.runInNewContext('('+catalogue.match(/export\s+const\s+productos\s*(?::[^=]+)?=\s*(\[[\s\S]*\]);?\s*$/)[1]+')');
const keys=vm.runInNewContext(pipeline.match(/const CLAVES_PRODUCTO_V2_REQUERIDAS = (\[[\s\S]*?\]);/)[1]);
const context={CLAVES_PRODUCTO_V2_REQUERIDAS:keys,CLAVES_OPCIONALES:['presentaciones','sku'],console:{log(){}}};
const start=pipeline.indexOf('function productoPublicado(');
vm.runInNewContext(pipeline.slice(start,pipeline.indexOf('// ---------------------------------------------------------------------------',start)),context);
const merge=pipeline.indexOf('function mergeProductos(');
vm.runInNewContext(pipeline.slice(merge,pipeline.indexOf('// ---------------------------------------------------------------------------',merge)),context);
test('el pipeline conserva el SKU maestro y no lo pierde en una actualización antigua',()=>{
  const {id,...source}=products[0];
  const incoming=context.productoPublicado({...source,sku:'ARDY-056'});
  assert.equal(incoming.sku,'ARDY-056');
  const merged=context.mergeProductos([{...source,id:999,sku:'ARDY-056'}],[source]);
  assert.equal(merged[0].sku,'ARDY-056');
  assert.throws(()=>context.productoPublicado({...source,sku:'ARDY-WEB-NOMBRE'}),/SKU/);
});
test('los productos nacionales nuevos muestran su identidad incluso al cambiar de nombre',()=>{
  const registry=JSON.parse(fs.readFileSync('src/data/product-skus.json','utf8'));
  const compiled=ts.transpileModule(fs.readFileSync('src/lib/product-sku.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
  const helper={exports:{},require:()=>registry};vm.runInNewContext(compiled,helper);
  assert.equal(helper.exports.getSku({slug:'nombre-nuevo',slugsAnteriores:[],sku:'ARDY-056'}),'ARDY-056');
  for(const [slug,sku] of Object.entries({'mousepad-sublimado-plano':'ARDY-053','lanyard-con-mosqueton-giratorio-2cm':'ARDY-054','llavero-chapa-destapador':'ARDY-055','pines-personalizados':'ARDY-052'}))assert.equal(helper.exports.getSku({slug,slugsAnteriores:[]}),sku);
});
