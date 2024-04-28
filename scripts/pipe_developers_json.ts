// Requires webscraper and normalize_data.ts to be run
import { normalizeName, parseUrlToScreenshotName } from '../shared/lib';

const file = Bun.file('website/src/data/en.json');
if (!(await file.exists())) {
 console.log('Please run webscraper first');
 process.exit(1);
}
const json = await file.json();
for (const { name, url, tags, featured } of json) {
 const screenshotName = parseUrlToScreenshotName(url, name);
 if (!(await Bun.file(`website/src/assets/screenshots/${screenshotName}`).exists())) {
  continue;
 }
 Bun.write(
  `website/src/content/developers/${normalizeName(name)}.json`,
  JSON.stringify({
   name,
   url,
   screenshot: `@/assets/screenshots/${screenshotName}`,
   tags,
   featured,
  }),
 );
}
