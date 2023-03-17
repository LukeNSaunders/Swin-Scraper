import puppeteer, { Browser, Page } from "puppeteer";

let browser: Browser | undefined;

export async function createPage(): Promise<Page> {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
    });
  }
  const page = await browser.newPage();
  return page;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = undefined;
  }
}
