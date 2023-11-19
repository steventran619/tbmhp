import mongoose from 'mongoose';

const rootCloudImages = new Schema({
    resources: [cloudImageSchema]
});

const cloudImageSchema = new Schema({
    asset_id: String,
    public_id: String,
    format: String,
    version: Number,
    resource_type: String,
    type: String,
    created_at: String,
    bytes: Number,
    width: Number,
    height: Number,
    folder: String,
    url: String,
    secure_url: String
});

const CloudImageModel = mongoose.model('CloudImage', cloudImageSchema);
const RootCloudImagesModel = mongoose.model('RootObject', rootCloudImages);

export { CloudImageModel, RootCloudImagesModel };