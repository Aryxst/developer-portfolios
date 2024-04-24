import names from "../data/names.json";
import urls from "../data/urls.json";
import { parseUrlToScreenshotName } from "../shared/lib";

Bun.write(
  "./data/en.json",
  JSON.stringify(
    names.map((name, index) => {
      const url = urls[index];
      return {
        name,
        url,
        screenshot: `screenshots/${parseUrlToScreenshotName(url, name)}`,
      };
    })
  )
);
