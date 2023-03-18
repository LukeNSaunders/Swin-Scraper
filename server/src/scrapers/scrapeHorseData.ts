import { Browser, Page } from 'puppeteer';
import { createPage, closeBrowser } from '../utils/puppeteerUtils';

export interface HorseData {
  horseName: string;
  horseOdds: string;
};

async function scrapeHorseNamesAndOdds(page: Page): Promise<[string[], string[]]> {
  const [horseNames, horseOdds] = await Promise.all([
    page.$$eval('.runner-name', (elements: Element[]) => elements.map((el: Element) => el.textContent?.trim())),
    page.$$eval('.win-market-odds', (elements: Element[]) => elements.map((el: Element) => el.textContent?.trim())),
  ]);
  return [horseNames, horseOdds] as [string[], string[]];
}

function formatHorseInfo(horseNames: string[], horseOdds: string[]): HorseData[] {
  return horseNames.map((horseName, index) => ({
    horseName: horseName,
    horseOdds: horseOdds[index],
  }));
}

function removeUnwantedHorseInfo(formattedHorseInfo: HorseData[]): HorseData[] {
  const uniqueHorseInfo: HorseData[] = [];
  formattedHorseInfo.forEach((horse) => {
    if (!horse.horseName.toLowerCase().includes('favourite')) {
    const existingHorse = uniqueHorseInfo.find(
      (uniqueHorse) => uniqueHorse.horseName === horse.horseName
    );
    if (!existingHorse) {
      uniqueHorseInfo.push(horse);
    }
  }
  });
  return uniqueHorseInfo;
}

export async function scrapeAllHorseInfo(eventUrl: string): Promise<HorseData[]> {
  const page = await createPage();
  await page.goto(eventUrl);
  const [horseNames, horseOdds] = await scrapeHorseNamesAndOdds(page);
  const formattedHorseInfo = formatHorseInfo(horseNames, horseOdds);
  const uniqueHorseInfo = removeUnwantedHorseInfo(formattedHorseInfo);
  await closeBrowser();
  return uniqueHorseInfo ;
}
