import { createPage, closeBrowser } from '../utils/puppeteerUtils';

interface EventInfo {
  eventLink?: string | null;
  eventName: string;
  eventTime: string 
}

export async function scrapeEventData(pageURL: string): Promise<EventInfo[]> {
  const page = await createPage();
  await page.goto(pageURL);

  // query page for href elements that have <a> tag as closest parent element

  const eventInfo = await page.$$eval('a[href] > div.race-name', (linkElements) => {
    const regex = /\s(?=\d)/;
    const links = linkElements.map((linkElement) => linkElement.closest('a')?.getAttribute('href'));
    const eventInfo = Array.from(document.querySelectorAll('.race-name-time')).map((eventInfo) =>
      eventInfo.textContent!.trim().split(regex)
    );
    return links.map((link, index) => ({
      eventLink: link,
      eventName: eventInfo[index][0],
      eventTime: eventInfo[index][1],
    }));
  });

  await closeBrowser();

  return eventInfo;
}
