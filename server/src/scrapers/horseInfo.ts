import { createPage, closeBrowser } from './puppeteerUtils';

type HorseData = {
  horseName: string;
  horseOdds: string;
};

export async function scrapeHorseInfo(eventUrl: string): Promise<HorseData[]> {
  // initialise puppeteer scraping

  const page = await createPage();
  await page.goto(eventUrl);

  // query whole page for relevant classes (horse names and odds)

  const [horseNames, horseOdds] = await Promise.all([
    page.$$eval('.runner-name', (elements) => elements.map((el) => el.textContent?.trim())),
    page.$$eval('.win-market-odds', (elements) => elements.map((el) => el.textContent?.trim())),
  ]);

  // format scraped text content into new object
  await closeBrowser();

  const formatedHorseInfo = horseNames.map((horseName, index) => ({
    horseName: horseName,
    horseOdds: horseOdds[index],
  }));
  return formatedHorseInfo as any;
}

// event Links that will be used on client side for onClick and data fetching

export async function scrapeEventInfo(pageURL: string): Promise<string[]> {
  const page = await createPage();
  await page.goto(pageURL);

  // query page for href elements that have <a> tag as closest parent element

  const eventInfo = await page.$$eval('a[href] > div.race-name', (linkElements) => {
    const links = linkElements.map((linkElement) => linkElement.closest('a')?.getAttribute('href'));
    const eventInfo = Array.from(document.querySelectorAll('.race-name-time')).map((eventInfo) =>
      eventInfo.textContent!.trim()
    );
    return links.map((link, index) => ({ eventLink: link, eventInfo: eventInfo[index] }));
  });

  await closeBrowser();

  return eventInfo as any;
}
