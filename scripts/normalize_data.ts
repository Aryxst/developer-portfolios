import { parseUrlToScreenshotName } from '../shared/lib';
import names from '../website/src/data/names.json';
import urls from '../website/src/data/urls.json';

const file = Bun.file('webscraper/result.json');
if (!(await file.exists())) {
 console.log('Please run webscraper first');
 process.exit(1);
}
const json = await file.json();
Bun.write(
 'website/src/data/en.json',
 JSON.stringify(
  names.map((name, index) => {
   const url = urls[index];
   console.log(url);
   return {
    name,
    url,
    screenshot: parseUrlToScreenshotName(url, name),
    tags: json.find(data => data[0].toLowerCase().includes(url.toLowerCase()))[4],
   };
  }),
 ),
);
