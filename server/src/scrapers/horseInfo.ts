import puppeteer from 'puppeteer';

type HorseData = {
  horseName: string;
  horseOdds: string;
};

export async function scrapeHorseInfo(eventUrl: string): Promise<HorseData[]> {
  // initialise puppeteer scraping

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(eventUrl);

  // query whole page for relevant classes (horse names and odds)

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

// event Links that will be used on client side for onClick and data fetching 

export async function scrapeEventLinks(pageURL: string) : Promise<string[]>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageURL);

  // query page for href elements that have <a> tag as closest parent element 
  const eventLinks = await page.evaluate(() => {
    const linkElements = document.querySelectorAll('a[href] > div.race-name')
    const links = Array.from(linkElements, linkElement => linkElement.closest('a')?.getAttribute('href'));
    return links as string[];
  });

  await browser.close();

  return eventLinks
}

scrapeEventLinks('https://sports.bwin.com/en/sports/horse-racing-29/today').then((links) => {
  console.log(links);
});
