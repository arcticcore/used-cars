import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const read=p=>readFileSync(p,'utf8');
const cars=readdirSync('data/cars').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(read(`data/cars/${f}`)));
test('drafts stay outside published model routes and sitemap, previews are noindex',()=>{
 const sitemap=read('dist/sitemap.xml');
 for(const car of cars){
  if(car.status==='draft'){
   assert.ok(!existsSync(`dist/modeller/${car.id}/index.html`));
   assert.ok(!sitemap.includes(car.id));
   const preview=read(`dist/forhandsvisning/${car.id}/index.html`);
   assert.match(preview, /name="robots" content="noindex, nofollow"/);
   assert.match(preview,/Innehållsutkast – inte färdiggranskat/);
  }else{
   assert.ok(existsSync(`dist/modeller/${car.id}/index.html`));
   assert.ok(sitemap.includes(`/modeller/${car.id}/`));
  }
 }
});
test('all generated internal links and local assets resolve under the Pages base path',()=>{
 function scan(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())scan(path);else if(path.endsWith('.html')){
  for(const match of read(path).matchAll(/(?:href|src)="([^"#]+)"/g)){
   const href=match[1];if(!href.startsWith('/'))continue;
   assert.ok(href.startsWith('/used-cars/'),`${path}: incorrect base ${href}`);
   const file=decodeURIComponent(href.split(/[?#]/)[0].replace(/^\/used-cars\//,''));
   assert.ok(existsSync(join('dist',file.endsWith('/')||file===''?file+'index.html':file)),`${path}: missing ${href}`);
  }
 }}}
 scan('dist');
});

import {matchesScope,matchesSearch} from '../src/lib/filter.mjs';
const golf=cars.find(c=>c.id==='volkswagen-golf-vii');
const matching=selection=>golf.issues.filter(i=>matchesScope(i.appliesTo,selection)).map(i=>i.id);
test('engine selection retains shared rust and limits engine and transmission warnings',()=>{
 assert.deepEqual(matching({variantIds:'12-tsi',transmissions:'DSG',bodyStyles:'Halvkombi'}),['dsg-jerking','rust-front-doors']);
 assert.deepEqual(matching({variantIds:'16-tdi',transmissions:'Manuell',bodyStyles:'Halvkombi'}),['diesel-short-trips','rust-front-doors']);
 assert.deepEqual(matching({variantIds:'12-tsi',transmissions:'Manuell',bodyStyles:'Kombi'}),[]);
 assert.equal(matching({}).length,3);
 const equipmentScope={variantIds:[],transmissions:[],bodyStyles:[],equipment:['Panoramatak']};
 assert.ok(matchesScope(equipmentScope,{}));
 assert.ok(!matchesScope(equipmentScope,{equipment:'Utan panoramatak'}));
});
test('search is case insensitive and handles separated words and empty queries',()=>{
 assert.ok(matchesSearch('Volkswagen Golf VII',' golf   VOLKSWAGEN '));
 assert.ok(matchesSearch('Toyota Yaris',''));
 assert.ok(!matchesSearch('Toyota Yaris','Golf'));
});
test('Golf VII example renders motor choices and does not inherit a Golf VI chain fault',()=>{
 const html=read('dist/forhandsvisning/volkswagen-golf-vii/index.html');
 for(const name of ['1.2 TSI','1.4 TSI','1.6 TDI','2.0 TDI'])assert.ok(html.includes(name));
 assert.match(html,/Inte mänskligt granskat/);
 assert.match(html,/inte att varianten är problemfri/);
 assert.ok(!golf.issues.some(i=>/kedj/i.test(i.title)));
 assert.ok(!html.includes('<svg'));
});
