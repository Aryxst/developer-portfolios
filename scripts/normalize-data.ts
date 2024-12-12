import { urlToScreenshot } from '../shared/lib';
import raw from '../website/src/data/raw.json';

const file = Bun.file('webscraper/result.json');
if (!(await file.exists())) {
 console.log('Run webscraper first');
 process.exit(1);
}
const json = await file.json();
Bun.write(
 'website/src/data/en.json',
 JSON.stringify(
  raw.map(({ name, url, featured }) => {
   return {
    name,
    url,
    screenshot: urlToScreenshot(url, name),
    tags: json.find(([_url]) => _url.toLowerCase().includes(url.toLowerCase()))[1] ?? [],
    featured,
   };
  }),
 ),
);
