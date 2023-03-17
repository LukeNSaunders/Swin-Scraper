import { scrapeAllHorseInfo } from '../scrapers/scrapeHorseData';
import { Request, Response } from 'express';
import { scrapeEventData } from '../scrapers/scrapeEventData';

export const scrapeOddsByEvent = async (req: Request, res: Response) => {

  try {
    const { eventUrl } = req.body;
    console.log('eventUrl', eventUrl)
    if (!eventUrl) {
      return res.status(400).send('Please provide valid URL');
    }
    const data = await scrapeAllHorseInfo(eventUrl);
    console.log(data)
    res.status(201);
    res.json(data);
  } catch (error) {
    res.status(500);
    console.log('ERROR!', error);
  }
};

export const scrapeEvents = async (req:Request, res:Response) => {
  
  try {
    const {pageURL} = req.body
    const data = await(scrapeEventData(pageURL))
    console.log(data)
    res.status(201);
    res.json(data);
    
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
  }
}
