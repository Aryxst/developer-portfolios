import { type rawStack, namings } from '../webscraper/src/namings';
function normalizeUrl(url: string) {
 return (
  url
   .replace(/http.*\/\//g, '')
   .replace('?', ',')
   .replace(/\//g, '_')
   // https://www.fileformat.info/info/unicode/char/0023/index.htm
   .replace(/#/g, '35')
   .toLowerCase()
 );
}
function normalizeName(name: string) {
 return name.replace(/[éè]/g, 'e').replace(/[à]/g, 'a').replace(/ì/g, 'i').replace(/ /g, '_').toLowerCase();
}
function urlToScreenshot(url: string, name: string) {
 const normalizedUrl = normalizeUrl(url);
 const normalizedName = normalizeName(name);
 return `${normalizedUrl}-${normalizedName}.png`;
}
function getStacksName(stacks: Array<rawStack>) {
 return stacks.map(s => namings[s].name);
}
// GENERIC
function chunkify<T>(array: Array<T>, n: number): Array<Array<T>> {
 let chunks: Array<Array<T>> = [];
 for (let i = n; i > 0; i--) {
  chunks.push(array.splice(0, Math.ceil(array.length / i)));
 }
 return chunks;
}

export { chunkify, getStacksName, normalizeName, normalizeUrl, urlToScreenshot };
