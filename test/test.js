const puppeteer = require("puppeteer");
const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const screenshotPath = "./test/screenshots";
  const regressionScr = screenshotPath + "/screenshot_0.png";
  const currentScr = screenshotPath + "/current.png";

  await delay(4000);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:4000");
  await delay(2000);

  await page.screenshot({ path: currentScr, fullPage: true });
  await browser.close();

  const data = await compareImages(
    await fs.readFile(regressionScr),
    await fs.readFile(currentScr),
    {}
  );

  await fs.writeFile(screenshotPath + "/output.png", data.getBuffer());

  console.log(data);
  return data.rawMisMatchPercentage > 0;
})();
