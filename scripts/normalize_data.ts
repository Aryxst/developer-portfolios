import names from "../data/names.json";
import urls from "../data/urls.json";
import { parseUrlToScreenshotName } from "../shared/lib";

import { joinStacksName } from "../webscraper/src/lib/render/defines";
import type { rawStack } from "../webscraper/src/namings";
import type { RequestResult } from "../webscraper/src/worker";

if (!(await Bun.file("webscraper/result.json").exists())) {
  console.log("Please run webscraper first");
  process.exit(1);
}
const data = (await import("../webscraper/result.json"))
  .default as RequestResult[];

Bun.write(
  "./data/en.json",
  JSON.stringify(
    names.map((name, index) => {
      const url = urls[index];
      return {
        name,
        url,
        screenshot: `screenshots/${parseUrlToScreenshotName(url, name)}`,
        tags: joinStacksName(data[index][4] as rawStack[]),
      };
    })
  )
);
