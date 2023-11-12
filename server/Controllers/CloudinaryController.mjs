import axios from "axios";

const cloudinaryFoldersUrl = process.env.CLOUDINARY_FOLDERS_URL;
const cloudinaryFoldersMediaUrl = process.env.CLOUDINARY_FOLDERS_MEDIA_URL;
const cloudinaryKey = process.env.CLOUDINARY_KEY;
const cloudinarySecret = process.env.CLOUDINARY_SECRET;

export default async function SamplesFolder() {
    try {
        const response = await axios.get(`${cloudinaryFoldersUrl}`, {
            auth: {
                username: cloudinaryKey,
                password: cloudinarySecret
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export async function SampleMedia(folderName) {
    try {
        const response = await axios.get(`${cloudinaryFoldersMediaUrl}${folderName}`, {
            auth: {
                username: cloudinaryKey,
                password: cloudinarySecret
            }
        });
        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
