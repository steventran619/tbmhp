import express from 'express';
import mongoose from 'mongoose';
import { Image } from '../Models/ImagesModel.mjs';
import { connectMongo } from '../Middlewares/DbConnection.mjs';
// import UpdateMedia from '../Controllers/InstagramController.mjs';
import SamplesFolder from '../Controllers/CloudinaryController.mjs';
import { SampleMedia } from '../Controllers/CloudinaryController.mjs';
import { UpdateMedia, GetInstagramImages } from '../Controllers/InstagramController.mjs';

// Router for "instagram-media" MongoDB db
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Images requested");
    try {
        await connectMongo();
        const images = await mongoose.model('Image').find();
        res.send(images).status(200);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }
    }    
);

router.get('/cloudinary', async (req, res) => {
    console.log("Cloudinary images requested");
    try {
        let folders = await SamplesFolder();
        let data = [];
        for (const folder of folders.folders) {
            // console.log(folder.name);
            let subData = {album: folder.name, images: []}
            let response = await SampleMedia(folder.name);
            // console.log(response.resources)
            for (const resource of response.resources) {
                // console.log(resource.secure_url);
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


router.get("/update", async (req, res) => {
    console.log("Update requested");
    let mediaResults = UpdateMedia();
    res.send(mediaResults).status(200);
});

router.get('/cloudinary', async (req, res) => {
    console.log("Cloudinary images requested");
    try {
        let folders = await SamplesFolder();
        let data = [];
        for (const folder of folders.folders) {
            // console.log(folder.name);
            let subData = {album: folder.name, images: []}
            let response = await SampleMedia(folder.name);
            // console.log(response.resources)
            for (const resource of response.resources) {
                // console.log(resource.secure_url);
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