import puppeteer from 'puppeteer';

type HorseData = {
  horseName: string;
  horseOdds: string;
};

export default async function scrapeHorseInfo(eventUrl: string): Promise<HorseData[]> {
  // initialise puppeteer scraping

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(eventUrl);

  // query whole page for relevant classes (horse name and odds)

  const horseData = await page.evaluate(() => {
    const horseNames = Array.from(document.querySelectorAll('.runner-name')).map((horseName) =>
      horseName.textContent!.trim()
    );
    const horseOdds = Array.from(document.querySelectorAll('.win-market-odds')).map((horseOdds) =>
      horseOdds.textContent!.trim()
    );

    // format scraped text content into new object

    const formatedHorseInfo = horseNames.map((horseName, index) => ({
      horseName: horseName,
      horseOdds: horseOdds[index],
    }));
    return formatedHorseInfo;
  });

  await browser.close();

  // recursively call scraping function until array is populated

  let retryCount = 0;

  if (horseData.length === 0 && retryCount < 5) {
    retryCount++;
    console.log(horseData);
    return scrapeHorseInfo(eventUrl);
  } else {
    return horseData;
  }
}
