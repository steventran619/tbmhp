import mongoose from 'mongoose';

// SCHEMA: Define the collection's schema.
const datumSchema = mongoose.Schema({
    id: { type: String, required: true },
    media_type: { type: String, required: true },
    media_url: { type: String, required: true },
    children: {type: Array, required: false},
    caption: { type: String, required: false },
    date: { type: String, required: false }
});

const imageSchema = mongoose.Schema({
    id: { type: String, required: true },
    media_type: { type: String, required: true },
    media_url: { type: String, required: true },
    children: {type: Array, required: false},
    caption: { type: String, required: false },
    date: { type: String, required: false }
});

const pagingSchema = new mongoose.Schema({
    cursors: {
        before: String,
        after: String,
    },
});

const rootMediaSchema = new mongoose.Schema({
    data: [datumSchema],
    paging: pagingSchema,
});

const childrenSchema = new mongoose.Schema({
    data: { type: [datumSchema], required: false }
});

// Create models based on the schemas
const Datum = mongoose.model('Datum', datumSchema);
const Paging = mongoose.model('Paging', pagingSchema);
const RootMedia = mongoose.model('RootMedia', rootMediaSchema, 'media-all');
const ChildrenSchema = mongoose.model('ChildrenDatum', childrenSchema);
const Image = mongoose.model("Image", imageSchema, 'images');

export { Datum, Paging, RootMedia, ChildrenSchema, Image };