import mongoose from "mongoose";
import axios from "axios";
import { RootMedia, Image } from '../Models/ImagesModel.mjs';

const instagramApiURL = process.env.INSTAGRAM_API_URL;
const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const mongodbConnectString = process.env.MONGODB_CONNECT_STRING;

const headerConfig = {
    headers: {
        'Accept': 'application/json', // Specify that you expect JSON
    },
};

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

// TODO: Create a handler that will update the db/urls every 24 hours?
async function UpdateMedia() {
    console.log("test");
    await dropCollection('images');
    await dropCollection('media-all');

    await mongoose.connect(`${mongodbConnectString}`);

    // const database = mongoose.connection;
    try {
        const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,permalink,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
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

// GET GALLERY *****************************************
// app.get('/instagram-media', async (req, res) => {
//     try {
//         const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
//         res.json(response.data);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: 'Request to retrieve document failed' });
//     }
// });

// TODO: Get the media_urls from the instagram-media[media] objects from the MongoDB database
// GET GALLERYMONGO*****************************************
// app.get('/gallerymongo', async (req, res) => {
//     try {
//         const response = await axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`, headerConfig)
//         res.json(response.data);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: 'Request to retrieve document failed' });
//     }
// });

// Get Images from MongoDB/images collection
async function GetInstagramImages() {
    // app.get('/instagram-images', async (req, res) => {
    try {
        await mongoose.connect(`${mongodbConnectString}`);
        const images = await Image.find()
        // res.json(images).status(200);
        return images;
    } catch (error) {
        res.status(500).json({ error: 'Request to retrieve document failed' });
    } finally {
        await mongoose.disconnect();
    }
};

export { UpdateMedia, GetInstagramImages };