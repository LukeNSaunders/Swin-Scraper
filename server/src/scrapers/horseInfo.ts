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
    const horseNames = Array.from(document.querySelectorAll('.runner-name')).map(
      (horseName) => horseName.textContent!.trim()
    );
    const horseOdds = Array.from(document.querySelectorAll('.win-market-odds')).map(
      (horseOdds) => horseOdds.textContent!.trim())
    
    // format scraped text content into new object 
    
    const formatedHorseInfo = horseNames.map((horseName, index) => ({ horseName: horseName, horseOdds: horseOdds[index] }))
    return formatedHorseInfo
  });

  await browser.close();
  return horseData

}

// Testing scraper with Bwin URL 

scrapeHorseInfo("https://sports.bwin.com/en/sports/horse-racing-29/newcastle-44/2:4967495").then((horseInfo) => {
  // if (horseInfo.length) {
    const jsonHorseInfo = JSON.stringify(horseInfo);
    console.log(jsonHorseInfo, 'Horse info list');
  // }
});
