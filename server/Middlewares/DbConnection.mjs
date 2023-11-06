import { MongoClient } from "mongodb";

// TODO: Move dbName to .env
// MongoDB "instagram-media" db

const dbName = "instagram-media";
const connectionString = process.env.MONGODB_CONNECT_STRING;
const client = new MongoClient(connectionString);
let conn;
try {
    conn = await client.connect();
    console.log(`Connected successfully to MongoDB: ${dbName}`)

} catch (e) {
    console.error(e);
}
let db = conn.db(dbName);

export default db;