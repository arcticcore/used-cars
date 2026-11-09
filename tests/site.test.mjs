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
 assert.ok(html.includes('class="step-icon"'));
});

test('Range Rover 2012 keeps petrol chain warnings off diesel and retains shared issues',()=>{
 const range=cars.find(c=>c.id==='land-rover-range-rover-l322');
 const diesel=range.issues.filter(i=>matchesScope(i.appliesTo,{variantIds:'44-tdv8'}));
 assert.ok(!diesel.some(i=>i.id==='v8-chain-noise'));
 assert.ok(diesel.some(i=>i.id==='air-suspension'));
 assert.ok(range.issues.filter(i=>matchesScope(i.appliesTo,{variantIds:'50-supercharged'})).some(i=>i.id==='v8-chain-noise'));
 const html=read('dist/forhandsvisning/land-rover-range-rover-l322/index.html');
 assert.ok(html.includes('259'));
 assert.ok(html.includes('över projektets målbudget'));
 assert.ok(html.includes('Inte mänskligt granskat'));
});


test('every model groups each warning exactly once in consistent category steps',()=>{
 for(const car of cars){
  const route=car.status==='draft'?'forhandsvisning':'modeller';
  const html=read(`dist/${route}/${car.id}/index.html`);
  for(const [index,category] of ['engine','transmission','rust','other'].entries()){
   const match=html.match(new RegExp(`<section[^>]*data-issue-section="${category}"[\\s\\S]*?</section>`));
   const expected=car.issues.filter(issue=>issue.category===category);
   if(category==='other'&&!expected.length){assert.equal(match,null);continue;}
   assert.ok(match,`${car.id}: missing ${category} step`);
   assert.ok(match[0].includes(`id="heading-${category}">${index+1}. `));
   assert.ok(match[0].includes('data-empty'));
   assert.equal((match[0].match(/data-issue data-scope/g)||[]).length,expected.length);
   for(const issue of expected)assert.ok(match[0].includes(issue.title));
   for(const other of ['engine','transmission','rust','other'].filter(c=>c!==category)){
    assert.ok(!match[0].includes(`data-category="${other}"`));
   }
  }
 }
});

test('XC90 uses its own budget and keeps diesel-only risks off T5',()=>{
 const car=cars.find(c=>c.id==='volvo-xc90-ii');
 const selected=id=>car.issues.filter(i=>matchesScope(i.appliesTo,{variantIds:id})).map(i=>i.id);
 assert.deepEqual(selected('t5-awd-250'),['rust-inspection','ac-cooling']);
 assert.deepEqual(selected('d5-awd-235'),car.issues.map(i=>i.id));
 const html=read('dist/forhandsvisning/volvo-xc90-ii/index.html');
 assert.ok(html.includes(`Målbudget: cirka ${car.budgetTargetSek.toLocaleString('sv-SE')} kr`));
 assert.equal(car.budgetTargetSek,350000);
 assert.ok(html.includes('Inte mänskligt granskat'));
});

test('BMW keeps N43 and N47 warnings separate and unknown engine retains both',()=>{
 const car=cars.find(c=>c.id==='bmw-3-series-e90-e91');
 const matching=variantIds=>car.issues.filter(i=>matchesScope(i.appliesTo,{variantIds})).map(i=>i.id);
 for(const id of ['318i-n43','320i-n43'])assert.deepEqual(matching(id),['n43-timing-chain','n43-rough-running']);
 for(const id of ['318d-n47','320d-n47'])assert.deepEqual(matching(id),['n47-timing-chain','diesel-short-trips']);
 assert.equal(matching('').length,4);
 const html=read('dist/forhandsvisning/bmw-3-series-e90-e91/index.html');
 assert.ok(html.includes('Vi saknar specifikt rostunderlag'));
 assert.ok(html.includes('Inte mänskligt granskat'));
 assert.ok(!html.includes('Planerat researchunderlag'));
});
