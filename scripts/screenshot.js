import puppeteer from "puppeteer";
import urls from "../data/urls.json";
import names from "../data/names.json";
import { existsSync } from "node:fs";
// default 2 s
const slightlyDelayed = [
  "https://aditya.medhe.in",
  "https://abdulrahman.id",
  "https://aakash-sharma.netlify.app",
  "https://austingericke.com",
  "https://aayushkurup.dev",
  "https://aayushkurup.dev",
  "https://bharatdev.vercel.app",
  "https://cade.codes",
  "https://debasishdutta.is-a.dev",
  "https://dhruvabhat.netlify.app",
  "https://evander.vercel.app",
  "https://ezekielekunola.com",
  "https://pixeldania.netlify.app",
  "https://portfolio-dhirajb7.vercel.app",
  "https://gianlucagalota.dev",
  "https://dragonwarrior.vercel.app",
  "https://hemdev.vercel.app",
  "https://shenggg2000.github.io/portfolio",
];
// default 5 s
const delayed = ["eduardconstantin.github.io", "ehsanrafee.ir"];
// default 8.5 s
const extremelyDelayed = ["yudinkov.dev"];
function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
console.log(urls.length);
console.log(names.length);
puppeteer
  .launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe",
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    for (let i = 205; i < urls.length; i++) {
      console.time("goto");
      const url = urls[i];
      const userName = names[i];
      console.log(`| ${i + 1}/${urls.length} | ${url} | ${userName} |`);

      const urlName = url
        .replace(/http.*\/\//g, "")
        .replace(/\//g, "_")
        .toLowerCase();
      const path = `screenshots/${urlName}-${userName
        .replace(/ /g, "_")
        .toLowerCase()}.png`;

      if (existsSync(path)) {
        console.log(`Skipping ${urlName}-${userName}`);
        continue;
      }
      await page.goto(url, {
        // Wait for the network layer to be empty for at least 500ms
        waitUntil: "networkidle0",
      });

      await sleep(
        extremelyDelayed.includes(url)
          ? 8500
          : delayed.includes(url)
          ? 5000
          : slightlyDelayed.includes(url)
          ? 2000
          : 0
      );
      await page.screenshot({ path, optimizeForSpeed: true });
      console.timeEnd("goto");
    }
    await browser.close();
  });

// CHECKPOINT: Apr 23, 2024 280 300
