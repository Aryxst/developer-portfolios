import { parseUrlToScreenshotName } from '../shared/lib';
import names from '../website/src/data/names.json';
import urls from '../website/src/data/urls.json';
import { joinStacksName } from '../webscraper/src/lib/render/defines';
import { rawStack } from '../webscraper/src/namings';

let data = Bun.file('webscraper/result.json');
if (!(await data.exists())) {
 console.log('Please run webscraper first');
 process.exit(1);
}
data = await data.json();
Bun.write(
 'website/src/data/en.json',
 JSON.stringify(
  names.map((name, index) => {
   const url = urls[index];
   console.log(url);
   return {
    name,
    url,
    screenshot: `${index}-${parseUrlToScreenshotName(url, name)}`,
    tags: joinStacksName(data[index][4] as rawStack[]),
   };
  })
 )
);
