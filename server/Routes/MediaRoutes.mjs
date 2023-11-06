import express from 'express';
import { Image } from '../Models/ImagesModel.mjs';
import db from '../Middlewares/DbConnection.mjs';
import UpdateMedia from '../Controllers/InstagramController.mjs';

// Router for "instagram-media" MongoDB db
const router = express.Router();

router.get('/', async(req, res) => {
    let collection = await db.collection("images");
    let results = await collection.find({Image}).toArray();
    res.send(results).status(200);
});

router.get('/update', async(req, res) => {
    try {
        let mediaResults = UpdateMedia();
        res.send(mediaResults).status(200);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }    
});

export default router;