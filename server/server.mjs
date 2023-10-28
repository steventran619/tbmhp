
import dotenv from 'dotenv';
import express from 'express';
// require('dotenv').config();
import { Image } from './images-model.mjs';
import mongoose from 'mongoose';
import axios from 'axios';

// const express = require('express');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const instagramApiURL = process.env.INSTAGRAM_API_URL;
const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const mongodbConnectString = process.env.MONGODB_CONNECT_STRING;

function getInstagramMedia() {
    // Check Fetch URL
    // console.log("API URL", `${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`);

    axios.get(`${instagramApiURL}/me/media?fields=id,media_type,media_url,children{id,media_type,media_url,timestamp},caption,timestamp&access_token=${instagramAccessToken}`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        })
        .then(function () {
            // always executed
        });
}

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

async function main() {
    console.log('Connect string:\n\t', mongodbConnectString)
    await mongoose.connect(`${mongodbConnectString}`);
    app.use(express.json());  // to support JSON-encoded bodies


    // fetch data from instagram
    const instagramData = await getInstagramMedia();


    const kittySchema = new mongoose.Schema({
        name: String
    });

    const imageSchema = mongoose.Schema({
        media_id: { type: Number, required: true },
        media_type: { type: String, required: true },
        media_url: { type: String, required: true },
        caption: { type: String, required: false },
        date: { type: Date, required: true }
    });

    const Image = mongoose.model("Image", imageSchema);

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

    const testImage = new Image({
        media_id: 12345,
        media_type: 'IMAGE',
        media_url: "https://fastly.picsum.photos/id/962/300/300.jpg?hmac=hP9T9VNlpDM329RHKCi7z4xlwmcGHk0vESh2oF1MvWY",
        date: "2023-10-27T14:42:23+0000"
    });
    await testImage.save();

    // kittySchema.methods.speak = function speak() {
    //     const greeting = this.name
    //     ? 'Meow name is ' + this.name
    //     : 'I don\'t have a name';
    //     console.log(greeting);
    // };

    // // Needs to recompile the model
    // const Kitten = mongoose.model('Kitten', kittySchema);

    // const silence = new Kitten({ name: 'Silence' });
    // console.log(silence.name); // 'Silence'

    // // NOTE: methods must be added to the schema before compiling it with mongoose.model()


    // const fluffy = new Kitten({ name: 'fluffy' });
    // await fluffy.save();
    // fluffy.speak(); // "Meow name is fluffy"

    // const kittens = await Kitten.find();
    // console.log(kittens);

    // await Kitten.find({ name: /^fluff/ });

}

app.listen(PORT || 3001, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
    main().catch(err => console.log(err));
    // const imagePost = createImage({
    //     media_id: 12345,
    //     media_type: 'IMAGE',
    //     media_url: "https://fastly.picsum.photos/id/962/300/300.jpg?hmac=hP9T9VNlpDM329RHKCi7z4xlwmcGHk0vESh2oF1MvWY",
    //     date: "2023-10-27T14:42:23+0000"
    // })
    // console.log(imagePost)
});

// main().catch(err => console.log(err));

// main()
//   .then(() => {
//     console.log('MongoDB connection successful.');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });