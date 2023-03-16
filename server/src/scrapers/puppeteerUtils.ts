import puppeteer, {Page} from "puppeteer";

export async function createPage() : Promise<Page> {
  const browser = await puppeteer.launch({
    headless:true,
  })
  const page = await browser.newPage()
  return page 
}

export async function closeBrowser() : Promise<void> {
  const browser = await puppeteer.launch()
  await browser.close()
}