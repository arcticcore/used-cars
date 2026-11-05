import {reviewed,url} from '../lib/cars';
export function GET(){const paths=['','metodik/',...reviewed.map(c=>`modeller/${c.id}/`)];return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>https://arcticcore.github.io${url(p)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});}
