import type sample from '../../data/cars/volkswagen-golf-vi.json';
type Source = {id:string;title:string;url:string;accessedAt:string;kind:string};
type Variant = {id:string;label:string;engineCodes:string[];fuel:string;yearFrom:number;yearTo:number;transmission:string;timingDrive:string;sourceIds:string[]};
type Issue = {id:string;title:string;variantIds:string[];description:string;symptoms:string[];checks:string[];evidence:string;sourceIds:string[]};
export type Car = Omit<typeof sample,'variants'|'issues'|'sources'|'provenance'> & {variants:Variant[];issues:Issue[];sources:Source[];provenance:{method:string;provider:string|null;model:string|null;generatedAt:string;reviewedBy:string|null;reviewedAt:string|null}};
const modules = import.meta.glob<Car>('../../data/cars/*.json', { eager: true, import: 'default' });
export const cars = Object.values(modules).sort((a,b)=>a.brand.localeCompare(b.brand,'sv'));
export const reviewed = cars.filter(car=>car.status==='reviewed');
export const drafts = cars.filter(car=>car.status==='draft');
export const url = (path='') => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
export const repo = 'https://github.com/arcticcore/used-cars';
export const fuelNames:Record<string,string> = {petrol:'Bensin',diesel:'Diesel',hybrid:'Hybrid',electric:'El'};
export const timingNames:Record<string,string> = {chain:'Kamkedja',belt:'Kamrem','not-applicable':'Ej tillämpligt',unknown:'Ej verifierat'};
export function stale(date:string|null) { if(!date) return false; const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth()-6); return new Date(date)<cutoff; }
