import { Router } from 'express';
import { scrapeOddsByEvent } from './controllers/scrapeOddsByEvent';
import { authenticateToken } from './middleware/auth';

// Initialise router 

const router: Router = Router();

// Define routes 

router.post('/odds', authenticateToken, scrapeOddsByEvent);

export default router;
