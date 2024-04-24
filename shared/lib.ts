function normalizeUrl(url: string) {
  return url
    .replace(/http.*\/\//g, "")
    .replace("?", ",")
    .replace(/\//g, "_")
    .toLowerCase();
}
function parseUrlToScreenshotName(url: string, name: string) {
  return `${normalizeUrl(url)}-${name.replace(/ /g, "_").toLowerCase()}.png`;
}

function sleep(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
export { normalizeUrl, parseUrlToScreenshotName, sleep };
