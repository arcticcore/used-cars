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
   assert.match(preview,/Förhandsvisning — research pågår/);
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
