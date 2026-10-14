import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {test} from 'node:test';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const nativeRequire=createRequire(import.meta.url);
const cache=new Map();
function load(file){
  const found=[file,file+'.ts',file+'.tsx',file+'.json',path.join(file,'index.ts')].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
  if(!found)throw new Error(file);
  if(found.endsWith('.json'))return JSON.parse(fs.readFileSync(found,'utf8'));
  if(cache.has(found))return cache.get(found).exports;
  const module={exports:{}};cache.set(found,module);
  const compiled=ts.transpileModule(fs.readFileSync(found,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const require=name=>name.startsWith('@/')?load(path.resolve('src',name.slice(2))):name.startsWith('.')?load(path.resolve(path.dirname(found),name)):nativeRequire(name);
  vm.runInThisContext('(function(exports,require,module,__filename,__dirname){'+compiled+'\n})')(module.exports,require,module,found,path.dirname(found));
  return module.exports;
}
const {productos}=load(path.resolve('src/data/productos'));
const {getPrecioDesdeNacionalizado,formatPrecio}=load(path.resolve('src/lib/productos'));
const {FichaProducto}=load(path.resolve('src/components/producto/FichaProducto'));
test('Desde es el mínimo real, incluso si no corresponde a 500 unidades',()=>{
  const p={modalidades:{nacionalizado:{precios:{50:8,100:5,500:6}}}};
  assert.equal(getPrecioDesdeNacionalizado(p),5);
  assert.equal(getPrecioDesdeNacionalizado({modalidades:{nacionalizado:{precios:{50:null,100:0,500:Infinity}}}}),null);
  assert.equal(getPrecioDesdeNacionalizado({modalidades:{nacionalizado:null}}),null);
});
test('las cuatro fichas manuales renderizan el mínimo y conservan la cotización seleccionada',()=>{
  for(const slug of ['pines-personalizados','mousepad-sublimado-plano','lanyard-con-mosqueton-giratorio-2cm','llavero-chapa-destapador']){
    const product=productos.find(p=>p.slug===slug);assert.ok(product);
    const before=JSON.stringify(product);
    const html=renderToStaticMarkup(createElement(FichaProducto,{producto:product}));
    const min=Math.min(...Object.values(product.modalidades.nacionalizado.precios).filter(p=>typeof p==='number'&&p>0));
    assert.ok(html.includes('Desde '+formatPrecio(min)),slug);
    const quantity=product.modalidades.nacionalizado.precioDesde??[50,100,500].find(q=>product.modalidades.nacionalizado.precios[q]>0);
    const price=product.modalidades.nacionalizado.precios[quantity];
    if(price!==min)assert.ok(html.includes('Para '+quantity+' unidades: '+formatPrecio(price)),slug);
    const messages=[...html.matchAll(/href="([^"]+)"/g)].filter(m=>m[1].includes('wa.me/')).map(m=>new URL(m[1].replaceAll('&amp;','&')).searchParams.get('text'));
    assert.ok(messages.some(m=>m?.includes('(nacionalizado)')&&m.includes(`Cantidad: ${quantity} unidades (S/ ${price.toFixed(2)} c/u`)), 'La cotización de WhatsApp debe conservar el precio de la cantidad seleccionada');
    assert.equal(JSON.stringify(product),before);
  }
});
