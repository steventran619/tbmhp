import { MongoClient } from "mongodb";

// TODO: Move dbName to .env
// MongoDB "instagram-media" db

const dbName = "instagram-media";
const connectionString = process.env.MONGODB_CONNECT_STRING;
const client = new MongoClient(connectionString);
let conn;
let db;

async function connectMongo() {
    try {
        conn = await client.connect();
        db = conn.db(dbName);
        console.log(`Connected successfully to MongoDB: ${dbName}`)
        return db;
    } catch (e) {
        console.error(e);
    }
}
// try {
//     conn = await client.connect();
//     db = conn.db(dbName);
//     console.log(`Connected successfully to MongoDB: ${dbName}`)

// } catch (e) {
//     console.error(e);
// } finally {
//     await conn.close();
//     // should I close it here?
// }

export { connectMongo };