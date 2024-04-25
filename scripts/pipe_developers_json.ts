// Requires webscraper and normalize_data.ts to be run
import { normalizeName, parseUrlToScreenshotName } from '../shared/lib';

const data = Bun.file('website/src/data/en.json');
if (!(await data.exists())) {
 console.log('Please run webscraper first');
 process.exit(1);
}
const json = await data.json();
for (const developer of json) {
 const screenshotName = parseUrlToScreenshotName(developer.url, developer.name);
 if (!(await Bun.file(`website/src/assets/screenshots/${screenshotName}`).exists())) {
  continue;
 }
 Bun.write(
  `website/src/content/developers/${normalizeName(developer.name)}.json`,
  JSON.stringify({
   name: developer.name,
   url: developer.url,
   screenshot: `@/assets/screenshots/${screenshotName}`,
   tags: developer.tags,
  }),
 );
}
