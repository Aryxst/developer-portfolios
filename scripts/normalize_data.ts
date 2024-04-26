import { parseUrlToScreenshotName } from '../shared/lib';
import raw from '../website/src/data/raw.json';

const file = Bun.file('webscraper/result.json');
if (!(await file.exists())) {
 console.log('Please run webscraper first');
 process.exit(1);
}
const json = await file.json();
Bun.write(
 'website/src/data/en.json',
 JSON.stringify(
  raw.map(({ name, url }) => {
   return {
    name,
    url,
    screenshot: parseUrlToScreenshotName(url, name),
    tags: json.find(data => data[0].toLowerCase().includes(url.toLowerCase()))[4],
   };
  }),
 ),
);
