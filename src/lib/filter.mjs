/** Unknown selections retain all potentially relevant warnings. Empty scope arrays mean all. */
export function matchesScope(scope, selection) {
  return ['variantIds', 'bodyStyles', 'transmissions', 'equipment'].every(key => {
    const selected = selection[key];
    return !selected || !scope[key].length || scope[key].includes(selected);
  });
}
export function matchesSearch(value, query) {
  const normalize = text => text.normalize('NFKC').toLocaleLowerCase('sv').trim();
  return normalize(query).split(/\s+/).every(word => normalize(value).includes(word));
}
