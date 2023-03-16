import { Router } from 'express';
import { scrapeOddsByEvent } from './controllers/scrapeOddsByEvent';
import { registerUser } from './controllers/userController';
import { authenticateToken } from './middleware/auth';

// Initialise router 

const router: Router = Router();

// Define routes 

router.post('/odds', authenticateToken, scrapeOddsByEvent);
router.post('/register', registerUser)

export default router;
