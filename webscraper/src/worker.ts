import { regexps } from './namings';
import { parseUrl } from './utils';
import { normalizeUrl } from '../../shared/lib';;

declare var self: Worker;
export type RequestResult = [string, Array<string>];

const outDir = import.meta.dir + '/../out';

self.onmessage = async ({ data: urls }: MessageEvent) => {
 const requests: RequestResult[] = [];
 for (let i = 0; i < urls.length; i++) {
  const url = new URL(urls[i]);
  console.time('fetch');
  console.log(`| ${i + 1}/${urls.length} | ${url}`);

  try {
   const res = await fetch(url.href);
   const normalizedUrl = normalizeUrl(url.href);
   const dest = `${outDir}/${normalizedUrl}.txt`;
   const file = Bun.file(dest);

   const writer = file.writer();
   writer.start();

   writer.write(
    await new HTMLRewriter()
     .on("link[rel='stylesheet']", {
      async element(el) {
       try {
        const src = parseUrl(el.getAttribute('href')!, url.origin);
        if (!src) return;
        const cssRes = await fetch(src);
        writer.write(await cssRes.arrayBuffer());
       } catch (err) {
        console.error(`Failed to fetch css for ${url}:`, err);
       }
      },
     })
     .on('script', {
      async element(el) {
       try {
        const src = parseUrl(el.getAttribute('src')!, url.origin);
        if (!src) return;
        const jsRes = await fetch(src);
        writer.write(await jsRes.arrayBuffer());
       } catch (err) {
        console.error(`Failed to fetch js for ${url}:`, err);
       }
      },
     })
     // This happens in Svelte/SvelteKit, where they preload modules
     .on('link[rel="modulepreload"]', {
      async element(el) {
       try {
        const src = parseUrl(el.getAttribute('href')!, url.origin);
        if (!src) return;
        const jsRes = await fetch(src);
        writer.write(await jsRes.arrayBuffer());
       } catch (err) {
        console.error(`Failed to fetch js for ${url}:`, err);
       }
      },
     })
     .transform(res)
     .arrayBuffer(),
   );
   writer.end();
   
   const text = await file.text();
   const matchedExps = Object.keys(regexps)
    .map(key => {
     if (regexps[key as keyof typeof regexps].some((exp: RegExp) => exp.test(text))) return key;
     return;
    })
    .filter(Boolean) as Array<string>;
   
   requests.push([url.toString(), matchedExps]);
   console.timeEnd('fetch');
  } catch (err) {
   console.error(`Failed to process ${url}:`, err);
  }
 }
 self.postMessage(requests);
};
