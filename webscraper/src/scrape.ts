import os from 'os';
import { exists, mkdir } from 'fs/promises';
import { chunkify } from '../../shared/lib';
import raw from '../../website/src/data/raw.json';
import type { RequestResult } from './worker';

console.clear();
const threads = os.cpus();
const outDir = import.meta.dir + '/../out';
const urls = raw.map(x => x.url);

console.log(`Found ${urls.length} entries in entry data...`);

const threadCount = import.meta.env.NODE_ENV == 'PRODUCTION' ? 1 /* threads.length */ : Number(prompt(`How many worker threads do you want to use? (1-${threads.length})`));
if (!threadCount || threadCount > threads.length || threadCount == 0) throw Error('Must provide a number of threads less or equal to the number of threads, and not equal to 0!');
if (!(await exists(outDir))) {
 await mkdir(outDir);
}

async function run(jobs: any, concurrentWorkers: number) {
 console.time('scrape');
 const chunks = chunkify(jobs, concurrentWorkers).filter(x => x.length > 0);
 const result: RequestResult[] = [];
 let completedChunks = 0;

 chunks.forEach((data, i) => {
  const workerURL = new URL(`worker.ts`, import.meta.url).href;
  const worker = new Worker(workerURL);

  worker.postMessage(data);

  worker.onmessage = async event => {
   completedChunks++;
   console.timeEnd(`worker-${i}`);
   result.push(...event.data);
   console.log(completedChunks);
   if (completedChunks === chunks.length) {
    console.timeEnd('scrape');
    await Bun.write(import.meta.dir + '/../result.json', JSON.stringify(result));
    console.log(result);
    process.exit();
   }
  };
  worker.addEventListener('open', () => {
   console.time(`worker-${i}`);
  });
 });
 console.log(chunks);
}
run(urls, threadCount);
