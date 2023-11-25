import express from 'express';
import { Events } from '../Controllers/EventController.mjs';

const router = express.Router();

router.get('/', (req, res) => Events(req, res));

export default router;