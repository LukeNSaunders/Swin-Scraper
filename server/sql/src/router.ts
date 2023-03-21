import { Router } from 'express';
import { scrapeOddsByEvent, scrapeEvents} from './controllers/scraperController';
import { registerUser, loginUser } from './controllers/userController';
import { authenticateUser } from './middleware/auth';

// Initialise router

const router: Router = Router();

// Scraper routes

router.post('/odds', authenticateUser, scrapeOddsByEvent);
router.post('/events', scrapeEvents);

// User routes

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
