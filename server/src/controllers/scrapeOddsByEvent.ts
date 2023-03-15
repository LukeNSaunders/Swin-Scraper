import scrapeHorseInfo from '../scrapers/horseInfo';
import { Request, Response } from 'express';

export const scrapeOddsByEvent = async (req: Request, res: Response) => {

  const { eventURL } = req.body;

  if (!eventURL) {
    return res.status(400).send('Please provide valid URL');
  }
  
  try {
    const odds = await scrapeHorseInfo(eventURL);
    res.status(201);
    res.send(odds);
  } catch (error) {
    res.status(500);
    console.log('ERROR', error);
  }
};
