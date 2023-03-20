import { scrapeAllHorseData } from '../scrapers/scrapeHorseData';
import { Request, Response } from 'express';
import { scrapeEventData } from '../scrapers/scrapeEventData';
import { EventData, HorseData } from '../returnTypes';

export const scrapeOddsByEvent = async (req:Request, res:Response) => {
  try {
    const { eventUrl } = req.body;
    if (!eventUrl) {
      res.status(400).send('Please provide valid URL')
      return;
    }
    const data : HorseData[] = await scrapeAllHorseData(eventUrl);
    res.status(201);
    res.json(data);
  } catch (error:any) {
    console.log('ERROR!', error);
    res.status(500).json({error:error.message});
  }
};

export const scrapeEvents = async (req:Request, res:Response) => {
  try {
    const { pageUrl } = req.body;
    const data : EventData[] = await scrapeEventData(pageUrl);
    console.log(data)
    res.status(201).json(data);
  } catch (error: any) {
    console.log('ERROR', error);
    res.status(500).json({error:error.message});
  }
};
