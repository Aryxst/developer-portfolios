import puppeteer from 'puppeteer';
import raw from '../website/src/data/raw.json';
import { existsSync, rmSync } from 'node:fs';
import { normalizeUrl, urlToScreenshot } from '../shared/lib';

console.clear();

console.log('Deleting screenshots with no developer data bound to it before proceeding...\n\n');

await Bun.sleep(3000);

const screenshotGlob = new Bun.Glob('*.png'),
 screenshotPath = 'website/src/assets/screenshots';

const screenshots = Array.from(screenshotGlob.scanSync(screenshotPath));
console.log(`Current screenshots: ${screenshots.length}\n\n`);

screenshots.forEach(file => {
 if (!raw.some(developer => file.includes(normalizeUrl(developer.url)))) {
  console.log(`Deleting ${file}`);
  rmSync(`${screenshotPath}/${file}`, { force: true });
 }
});
console.log(`Successfully deleted ${screenshots.length - Array.from(screenshotGlob.scanSync(screenshotPath)).length} screenshots with no developer data bound to it.`);

console.log('\n\n\nDevelopers(Name and URL):', raw.length);
await Bun.sleep(3000);

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
   const developer = raw[i];
   console.time('goto');
   console.log(`| ${i + 1}/${raw.length} | ${developer.url} | ${developer.name} |`);

   const path = `${screenshotPath}/${urlToScreenshot(developer.url, developer.name)}`;

   if (existsSync(path)) {
    console.log(`Skipping ${developer.url} | ${developer.name} |`);
    continue;
   }

   await page.goto(developer.url, {
    // Wait for the network layer to be empty for at least 500ms
    waitUntil: 'networkidle0',
   });

   developer.screenshot_delay && (await Bun.sleep(developer.screenshot_delay));
   await page.screenshot({ path, optimizeForSpeed: true });

   console.timeEnd('goto');
  }

  await browser.close();
 });
