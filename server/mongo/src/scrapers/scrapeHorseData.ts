import { Page } from 'puppeteer';
import { createPage, closeBrowser } from '../utils/puppeteerUtils';
import { HorseData } from '../types';

  // query event page for relevant classes (runner-name && win-market-odds)

async function scrapeHorseNamesAndOdds(page: Page): Promise<[string[], string[]]> {
  const [horseNames, horseOdds] = await Promise.all([
    page.$$eval('.runner-name', (elements: Element[]) => elements.map((el: Element) => el.textContent?.trim())),
    page.$$eval('.win-market-odds', (elements: Element[]) => elements.map((el: Element) => el.textContent?.trim())),
  ]);
  return [horseNames, horseOdds] as [string[], string[]];
}

// Format the horse Data into an array of HorseData objects

function formatHorseData(horseNames: string[], horseOdds: string[]): HorseData[] {
  return horseNames.map((horseName, index) => ({
    horseName: horseName,
    horseOdds: horseOdds[index],
  }));
}

// Remove unwanted horse Data (e.g., duplicates, 'favourite')

function removeUnwantedHorseData(formattedHorseData: HorseData[]): HorseData[] {
  const uniqueHorseData: HorseData[] = [];
  formattedHorseData.forEach((horse) => {
    if (!horse.horseName.toLowerCase().includes('favourite')) {
    const existingHorse = uniqueHorseData.find(
      (uniqueHorse) => uniqueHorse.horseName === horse.horseName
    );
    if (!existingHorse) {
      uniqueHorseData.push(horse);
    }
  }
  });
  return uniqueHorseData;
}

// Main function to scrape all horse Data from the event URL

export async function scrapeAllHorseData(eventUrl: string): Promise<HorseData[]> {
  const page = await createPage();
  await page.goto(eventUrl);
  const [horseNames, horseOdds] = await scrapeHorseNamesAndOdds(page);
  const formattedHorseData = formatHorseData(horseNames, horseOdds);
  const uniqueHorseData = removeUnwantedHorseData(formattedHorseData);
  await closeBrowser();
  return uniqueHorseData ;
}
