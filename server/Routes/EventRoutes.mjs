import express from 'express';
import { Events, PastEvents } from '../Controllers/EventController.mjs';

const router = express.Router();

router.get('/', (req, res) => Events(req, res));
router.get('/past', (req, res) => PastEvents(req, res));

export default router;