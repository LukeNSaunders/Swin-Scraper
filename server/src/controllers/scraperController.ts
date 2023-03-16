import {scrapeHorseInfo, scrapeEventInfo}from '../scrapers/horseInfo';
import { Request, Response } from 'express';

export const scrapeOddsByEvent = async (req: Request, res: Response) => {

  try {
    const { eventURL } = req.body;
    if (!eventURL) {
      return res.status(400).send('Please provide valid URL');
    }
    const data = await scrapeHorseInfo(eventURL);
  
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
    const data = await(scrapeEventInfo(pageURL))
    res.status(201);
    res.json(data);
    
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
  }
  

}
