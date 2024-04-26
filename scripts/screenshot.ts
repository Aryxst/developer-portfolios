import puppeteer from 'puppeteer';
import raw from '../website/src/data/raw.json';
import { existsSync } from 'node:fs';
import { parseUrlToScreenshotName, sleep } from '../shared/lib';
// default 2 s
const slightlyDelayed = ['https://aditya.medhe.in', 'https://abdulrahman.id', 'https://aakash-sharma.netlify.app', 'https://austingericke.com', 'https://aayushkurup.dev', 'https://aayushkurup.dev', 'https://bharatdev.vercel.app', 'https://cade.codes', 'https://debasishdutta.is-a.dev', 'https://dhruvabhat.netlify.app', 'https://evander.vercel.app', 'https://ezekielekunola.com', 'https://pixeldania.netlify.app', 'https://portfolio-dhirajb7.vercel.app', 'https://gianlucagalota.dev', 'https://dragonwarrior.vercel.app', 'https://hemdev.vercel.app', 'https://shenggg2000.github.io/portfolio'];
// default 5 s
const delayed = ['eduardconstantin.github.io', 'ehsanrafee.ir'];
// default 8.5 s
const extremelyDelayed = ['yudinkov.dev'];
console.log('Developers(Name and URL):', raw.length);
await sleep(3000);

puppeteer
 .launch({
  defaultViewport: {
   width: 1920,
   height: 1080,
  },
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
 })
 .then(async browser => {
  const page = await browser.newPage();
  for (let i = 0; i < raw.length; i++) {
   const { url, name } = raw[i];
   console.time('goto');
   console.log(`| ${i + 1}/${raw.length} | ${url} | ${name} |`);

   const path = `website/src/assets/screenshots/${parseUrlToScreenshotName(url, name)}`;

   if (existsSync(path)) {
    console.log(`Skipping ${url} | ${name} |`);
    continue;
   }

   await page.goto(url, {
    // Wait for the network layer to be empty for at least 500ms
    waitUntil: 'networkidle0',
   });

   await sleep(extremelyDelayed.includes(url) ? 8500 : delayed.includes(url) ? 5000 : slightlyDelayed.includes(url) ? 2000 : 0);
   await page.screenshot({ path, optimizeForSpeed: true });
   console.timeEnd('goto');
  }

  await browser.close();
 });
