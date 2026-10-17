import fs from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { homedir } from 'node:os';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || path.join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const source=await fs.readFile('src/data/productos.ts','utf8');
const products=vm.runInNewContext('('+source.match(/export\s+const\s+productos\s*(?::[^=]+)?=\s*(\[[\s\S]*\]);?\s*$/)[1]+')');
const registry=JSON.parse(await fs.readFile('src/data/product-skus.json','utf8'));
const output='evidence/responsive';await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];const base='http://127.0.0.1:4180';
try{
 for(const width of [320,360,390,430,768,1280]){
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/productos/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const horizontal=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(horizontal.scroll<=width+1,JSON.stringify(horizontal));
  const columns=await page.locator('.catalog-grid').evaluate(n=>getComputedStyle(n).gridTemplateColumns.split(' ').length);assert.equal(columns,width===320?1:width<1024?2:4);
  const banner=await page.locator('.catalog-photo-search').boundingBox();if(width<768)assert.ok(banner.height<195,JSON.stringify(banner));
  const floating=await page.locator('.floating-whatsapp').evaluate(n=>({position:getComputedStyle(n).position,href:n.href}));assert.ok(floating.href.startsWith('https://wa.me/'));assert.equal(floating.position,width<768?'static':'fixed');
  await page.screenshot({path:`${output}/productos-${width}-inicio.png`,fullPage:false});
  await page.locator('.catalog-grid').scrollIntoViewIfNeeded();await page.locator('.catalog-card-image img').first().evaluate(img=>img.decode().catch(()=>{}));
  if(width<768)assert.equal(await page.locator('.catalog-card-image img').first().evaluate(n=>getComputedStyle(n).objectFit),'contain');
  await page.screenshot({path:`${output}/productos-${width}-tarjetas.png`,fullPage:false});
  // Search remains live, tabs retain their filters, and reset restores full results.
  const input=page.getByRole('searchbox');await input.fill('resaltador');
  const expected=products.filter(p=>`${p.nombre} ${p.descripcionCorta} ${p.categoria} ${p.palabraClave}`.toLowerCase().includes('resaltador'));
  assert.ok(expected.length);await page.waitForFunction(n=>document.querySelectorAll('.catalog-card').length===Math.min(n,8),expected.length);
  const cards=await page.locator('.catalog-card').evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute('href').replace(/\/$/,''),text:n.innerText})));
  for(const card of cards){const p=expected.find(p=>card.href===`/productos/${p.slug}`);assert.ok(p,card.href);assert.ok(card.text.includes(p.sku||registry[p.slug]));const prices=Object.values(p.modalidades).flatMap(b=>b?Object.values(b.precios).filter(v=>typeof v==='number'&&v>0):[]);if(prices.length)assert.ok(card.text.includes(Math.min(...prices).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2})));}
  if(width===390){await page.locator('.catalog-grid').scrollIntoViewIfNeeded();await page.locator('.catalog-card-image img').evaluateAll(ns=>Promise.all(ns.map(i=>i.decode())));await page.screenshot({path:`${output}/resaltadores-390.png`,fullPage:false});}
  await input.fill('');await page.locator('.catalog-tabs button').nth(1).click();assert.equal(await page.locator('.catalog-tabs button').nth(1).getAttribute('aria-pressed'),'true');
  const trendLinks=await page.locator('.catalog-card').evaluateAll(ns=>ns.map(n=>n.getAttribute('href').replace(/\/$/,'')));for(const link of trendLinks)assert.ok(products.find(p=>link===`/productos/${p.slug}`)?.destacado);
  await page.locator('.catalog-tabs button').nth(2).click();const newLinks=await page.locator('.catalog-card').evaluateAll(ns=>ns.map(n=>n.getAttribute('href').replace(/\/$/,'')));for(const link of newLinks)assert.ok(products.find(p=>link===`/productos/${p.slug}`)?.esNovedad);
  await page.locator('.catalog-tabs button').first().click();
  if(width<768){await page.getByRole('button',{name:'Filtros +',exact:true}).click();await page.getByRole('combobox',{name:'Categoría',exact:true}).selectOption({index:1});assert.ok(await page.locator('.catalog-card').count());await page.getByRole('combobox',{name:'Categoría',exact:true}).selectOption('todas');await page.getByRole('button',{name:'Abrir menú'}).click();assert.equal(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded'),'true');await page.getByRole('button',{name:'Abrir menú'}).click();}
  const wa=await page.locator('.catalog-photo-action a').getAttribute('href');assert.ok(wa.includes('wa.me/')&&decodeURIComponent(wa).includes('foto de un producto'));
  const firstHref=(await page.locator('.catalog-card').first().getAttribute('href')).replace(/\/$/,'');await page.locator('.catalog-card').first().click();await page.waitForURL('**'+firstHref+'/');assert.equal(new URL(page.url()).pathname,firstHref+'/');
  assert.deepEqual(errors,[]);results.push({width,columns,horizontalOverflow:false,bannerHeight:banner.height,search:true,tabs:true,correctSkuPriceLinks:true,whatsapp:true,menu:width<768?'verified':'desktop unchanged'});await context.close();
 }
 await fs.writeFile(`${output}/validacion.json`,JSON.stringify({at:new Date().toISOString(),products:products.length,results},null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
