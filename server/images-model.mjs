// Import dependencies.
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// SCHEMA: Define the collection's schema.
const imageSchema = mongoose.Schema({
	media_id: { type: Number, required: true },
	media_type: { type: String, required: true },
	media_url: { type: String, required: true},
    caption: { type: String, required: false },
	date: { type: Date, required: false }
});

const Image = mongoose.model("Image", imageSchema);

export {Image};


// Connect based on the .env file parameters.
// mongoose.connect(
//     process.env.MONGODB_CONNECT_STRING,
//     { useNewUrlParser: true }
// );
// mongoose.connect('https://localhost:3001/instagram', { useNewUrlParser: true });
// const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
// db.once("open", (err) => {
//     if(err){
//         res.status(500).json({ error: '500:Connection to the server failed.' });
//     } else  {
//         console.log('Successfully connected to MongoDb Instagram collection using Mongoose.');
//     }
// });

// // CREATE model *****************************************
// const createImage = async (id, media_type, media_url, caption, date) => {
//     const image = new Image({ 
//         id: id, 
//         reps: media_type, 
//         weight: media_url,
//         unit: caption,
//         date: date
//     });
//     return image.save();
// }


// // RETRIEVE models *****************************************
// // Retrieve based on a filter and return a promise.
// const getImageUrls = async (filter) => {
//     const query = Image.find(filter);
//     return query.exec();
// }

// // Retrieve based on the ID and return a promise.
// const fineImageById = async (_id) => {
//     const query = Image.findById(_id);
//     return query.exec();
// }


// // DELETE model based on ID  *****************************************
// const deleteById = async (_id) => {
//     const result = await Image.deleteOne({_id: _id});
//     return result.deletedCount;
// };


// // Export our variables for use in the controller file.
// export { createImage, getImageUrls as findExercises, fineImageById as findExerciseById, deleteById }