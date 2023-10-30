import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './Routes/AuthRoute.mjs';
import axios from 'axios';
import { Datum, Paging, RootMedia, ChildrenSchema, Image } from './images-model.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const instagramApiURL = process.env.INSTAGRAM_API_URL;
const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const mongodbConnectString = process.env.MONGODB_CONNECT_STRING;

const headerConfig = {
    headers: {
        'Accept': 'application/json', // Specify that you expect JSON
    },
};

app.use(express.json());  // to support JSON-encoded bodies
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })); // so the frontend can talk to the backend
app.use(cookieParser()); // Parse cookies for auth
app.use("/admin", authRoute); // Admin routes

// CREATE model *****************************************
const createImage = async (media_id, media_type, media_url, caption, date) => {
    const image = new Image({
        media_id: media_id,
        media_type: media_type,
        media_url: media_url,
        caption: caption,
        date: date
    });
    return image.save();
}
// TODO: Learn how to use map or filter nested objects?

function filterImages(data) {
}

// Drops a collectionName from the Instagram-media database (based off ConnectString)
async function dropCollection(collectionName) {
    await mongoose.connect(`${mongodbConnectString}`);

    try {
        await mongoose.connection.collections[collectionName].drop();
        console.log(`* Collection ${collectionName} dropped`);
    } catch (error) {
        console.error('! MongoDB drop collection error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// TODO: Create a function to insert the Media and Images into the MongoDB database
// This is used for fetching from Instagram and inserting into MongoDB
async function UpdateMediaInMongoDB() {
    await dropCollection('images');
    await dropCollection('media-all');

    await mongoose.connect(`${mongodbConnectString}`);

    const database = mongoose.connection;
    // const collection = database.collection('images');
    try {
        const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
        let dataToInsert = response.data;

        // Save Raw Media in MongoDB
        const result = await RootMedia.create(dataToInsert);
        console.log('* Document inserted with _id:', result.insertedId);

        // Filters through the Me/Media for only Images
        const filteredImages = [];
        for (const obj of dataToInsert.data) {
            if (obj.media_type === 'IMAGE') {
                filteredImages.push(obj);
            }
            else if (obj.media_type === 'CAROUSEL_ALBUM') {
                for (const child of obj.children.data) {
                    if (child.media_type === 'IMAGE') {
                        filteredImages.push(child);
                    }
                }
            }
        };
        console.log("\tFiltered Images", filteredImages);

        // Save Filtered Images in MongoDB
        const result2 = await Image.insertMany(filteredImages);
        console.log('* Document inserted with _id:', result2.insertedId);

    } catch (error) {
        console.error('! MongoDB insertion error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

// GET GALLERY *****************************************
app.get('/gallery', async (req, res) => {
    try {
        const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }
});

// TODO: Get the media_urls from the instagram-media[media] objects from the MongoDB database
// GET GALLERYMONGO*****************************************
app.get('/gallerymongo', async (req, res) => {
    try {
        const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Request to retrieve document failed' });
    }
});



app.listen(PORT || 3000, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
    // dropCollection('media');
    // UpdateMediaInMongoDB();
    // main().catch(err => console.log(err));
});