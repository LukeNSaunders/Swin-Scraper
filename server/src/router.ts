import { Router } from 'express';
import { scrapeOddsByEvent } from './controllers/scrapeOddsByEvent';

// Initialise router 

const router: Router = Router();

// Define routes 

router.post('/odds', scrapeOddsByEvent);

export default router;
