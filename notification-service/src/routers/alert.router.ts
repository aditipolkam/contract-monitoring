import { Router } from 'express';
import sendAlert from '../controllers/sendAlert';

const router = Router();

router.post('/', sendAlert);

export default router;
