import { createPage, closeBrowser } from '../utils/puppeteerUtils';

interface EventInfo {
  eventUrl?: string | null;
  eventName: string;
  eventTime: string 
}

export async function scrapeEventData(pageUrl: string): Promise<EventInfo[]> {
  const page = await createPage();
  await page.goto(pageUrl);

  // query page for href elements that have <a> tag as closest parent element

  const eventInfo = await page.$$eval('a[href] > div.race-name', (linkElements) => {
    const regex = /\s(?=\d)/g;
    const links = linkElements.map((linkElement) => linkElement.closest('a')?.getAttribute('href'));
    const eventInfo = Array.from(document.querySelectorAll('.race-name-time')).map((eventInfo) =>
      eventInfo.textContent!.trim().split(regex)
    );
    return links.map((link, index) => ({
      eventUrl: link,
      eventName: eventInfo[index][0],
      eventTime: eventInfo[index][1],
    }));
  });

  await closeBrowser();

  return eventInfo;
}
