import { Router } from 'express';
import { scrapeOddsByEvent } from './controllers/scrapeOddsByEvent';
import { registerUser, loginUser } from './controllers/userController';
import { authenticateUser } from './middleware/auth';

// Initialise router

const router: Router = Router();

// Scraper routes

router.post('/odds', authenticateUser, scrapeOddsByEvent);

// User routes

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
