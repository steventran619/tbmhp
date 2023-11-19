import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// TODO: Move dbName to .env
// MongoDB "instagram-media" db

const dbName = "instagram-media";
const connectionString = process.env.MONGODB_CONNECT_STRING;
const client = new MongoClient(connectionString);
let conn;
let db;

async function connectMongo() {
    // try {
    //     conn = await client.connect();
    //     db = conn.db(dbName);
    //     console.log(`Connected successfully to MongoDB: ${dbName}`)
    //     return db;
    // } catch (e) {
    //     console.error(e);
    // }
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

export { connectMongo };