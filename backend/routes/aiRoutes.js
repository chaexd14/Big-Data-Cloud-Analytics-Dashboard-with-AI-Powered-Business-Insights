import express from 'express';
import { generateInsights } from '../controllers/aiController.js';

const router = express.Router();

router.get('/generate-insight', generateInsights);

export default router;