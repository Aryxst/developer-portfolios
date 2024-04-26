import namings, { type rawStack } from '../webscraper/src/namings';
function normalizeUrl(url: string) {
 return url
  .replace(/http.*\/\//g, '')
  .replace('?', ',')
  .replace(/\//g, '_')
  .toLowerCase();
}
function normalizeName(name: string) {
 return name.replace(/[éè]/g, 'e').replace(/[à]/g, 'a').replace(/ì/g, 'i').replace(/ /g, '_').toLowerCase();
}
function parseUrlToScreenshotName(url: string, name: string) {
 const normalizedUrl = normalizeUrl(url);
 const normalizedName = normalizeName(name);
 return `${normalizedUrl}-${normalizedName}.png`;
}
function sleep(time: number) {
 return new Promise(function (resolve) {
  setTimeout(resolve, time);
 });
}
function chunkify<T>(array: Array<T>, n: number): Array<Array<T>> {
 let chunks: Array<Array<T>> = [];
 for (let i = n; i > 0; i--) {
  chunks.push(array.splice(0, Math.ceil(array.length / i)));
 }
 return chunks;
}
function getStacksName(stacks: Array<rawStack>) {
 return stacks.map(s => namings[s].name);
}
export { normalizeName, normalizeUrl, parseUrlToScreenshotName, sleep, chunkify, getStacksName };
