import { Router } from 'express';
import { scrapeOddsByEvent } from './controllers/scrapeOddsByEvent';
import { registerUser, loginUser } from './controllers/userController';
import { authenticateToken } from './middleware/auth';

// Initialise router

const router: Router = Router();

// Scraper routes

router.post('/odds', authenticateToken, scrapeOddsByEvent);

// User routes

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
