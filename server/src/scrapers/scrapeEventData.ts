import { createPage, closeBrowser } from '../utils/puppeteerUtils';
import { EventData } from '../returnTypes';

export async function scrapeEventData(pageUrl: string): Promise<EventData[]> {
  const page = await createPage();
  await page.goto(pageUrl);

  // query page for href elements that have <a> tag as closest parent element

  const eventData = await page.$$eval('a[href] > div.race-name', (linkElements) => {
    const regex = /\s(?=\d)/g;
    const links = linkElements.map((linkElement) => linkElement.closest('a')?.getAttribute('href'));
    const eventData = Array.from(document.querySelectorAll('.race-name-time')).map((eventData) =>
      eventData.textContent!.trim().split(regex)
    );
    return links.map((link, index) => ({
      eventUrl: link,
      eventName: eventData[index][0],
      eventTime: eventData[index][1],
    }));
  });

  await closeBrowser();

  return eventData;
}
