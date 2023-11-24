import express from 'express';
import mongoose from 'mongoose';
import { Image } from '../Models/ImagesModel.mjs';
import UpdateMedia from '../Controllers/InstagramController.mjs';
import SamplesFolder from '../Controllers/CloudinaryController.mjs';
import { SampleMedia } from '../Controllers/CloudinaryController.mjs';

// Router for "instagram-media" MongoDB db
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Images requested");
    try {
        mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        let images = await Image.find({});
        console.log(images);
        res.status(200).json(images);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }}    
);

router.get('/update', async(req, res) => {
    try {
        await UpdateMedia();
        res.send("Instagram media links updated successfully").status(200);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }    
});

router.get('/cloudinary', async (req, res) => {
    console.log("Cloudinary images requested");
    try {
        let folders = await SamplesFolder();
        let data = [];
        for (const folder of folders.folders) {
            let subData = {album: folder.name, images: []}
            let response = await SampleMedia(folder.name);
            for (const resource of response.resources) {
                subData.images.push(resource.secure_url);
            }
            data.push(subData);
        }
        console.log(data);
        res.send(data).status(200);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Request to retrieve cloud media failed' });
    }
});

export default router;