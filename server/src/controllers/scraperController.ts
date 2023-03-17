import { scrapeAllHorseInfo } from '../scrapers/scrapeHorseData';

import { scrapeEventData } from '../scrapers/scrapeEventData';

export const scrapeOddsByEvent = async (req:any, res:any) => {
  try {
    const { eventUrl } = req.body;
    console.log('eventUrl', eventUrl);
    if (!eventUrl) {
      return res.status(400).send('Please provide valid URL');
    }
    const data = await scrapeAllHorseInfo(eventUrl);
    console.log(data);
    res.status(201);
    res.json(data);
  } catch (error) {
    res.status(500);
    console.log('ERROR!', error);
  }
};

export const scrapeEvents = async (req:any, res:any) => {
  try {
    const { pageURL } = req.body;
    const data = await scrapeEventData(pageURL);
    res.status(201).json(data);
  } catch (error: any) {
    console.log('ERROR', error);
    res.status(500).json({error:error.message});
  }
};
