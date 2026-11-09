export type Source = { id: string; title: string; url: string; accessedAt: string; kind: string };
export type Variant = {
  id: string; label: string; engineCodes: string[]; fuel: string;
  yearFrom: number; yearTo: number; transmission: string; timingDrive: string;
  sourceIds: string[]; buyerSummary: string;
};
export type Scope = { variantIds: string[]; bodyStyles: string[]; transmissions: string[]; equipment: string[]; label: string };
export type Issue = {
  id: string; title: string; category: 'engine'|'transmission'|'rust'|'other';
  kind: 'known-problem'|'usage-risk'|'general-check'; priority: number;
  appliesTo: Scope; description: string; symptoms: string[]; advice: string;
  action: 'check'|'resolve-before-buying'; sourceIds: string[];
};
export type Car = {
  schemaVersion: 2; id: string; brand: string; model: string; generation: string;
  status: 'draft'|'reviewed'; market: string; budgetTargetSek: number; summary: string;
  focusYears: {from:number;to:number}|null; researchTasks: string[];
  variants: Variant[]; issues: Issue[]; sources: Source[]; viewingChecklist: string[];
  priceObservations: {label:string;year:number;mileageMil:number;priceSek:number;observedAt:string;sourceIds:string[]}[];
  provenance: {method:string;provider:string|null;model:string|null;generatedAt:string;reviewedBy:string|null;reviewedAt:string|null};
};
const modules = import.meta.glob<Car>('../../data/cars/*.json', { eager: true, import: 'default' });
export const cars = Object.values(modules).sort((a,b)=>a.brand.localeCompare(b.brand,'sv') || b.generation.localeCompare(a.generation));
export const reviewed = cars.filter(car=>car.status==='reviewed');
export const drafts = cars.filter(car=>car.status==='draft');
export const url = (path='') => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
export const repo = 'https://github.com/arcticcore/used-cars';
export const fuelNames:Record<string,string> = {petrol:'Bensin',diesel:'Diesel',hybrid:'Hybrid',electric:'El'};
export const timingNames:Record<string,string> = {chain:'Kamkedja',belt:'Kamrem','not-applicable':'Ej tillämpligt',unknown:'Ej verifierat'};
export const kindNames = {'known-problem':'Känt problem / dokumenterad risk','usage-risk':'Användningsrisk','general-check':'Allmän kontroll'};
export function stale(date:string|null) { if(!date) return false; const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth()-6); return new Date(date)<cutoff; }
