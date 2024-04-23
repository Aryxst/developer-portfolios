import names from "./data/names.json";
import websiteUrls from "./data/urls.json";

Bun.write(
  "./data/en.json",
  JSON.stringify(
    names.map((name, index) => ({ name, url: websiteUrls[index] }))
  )
);
