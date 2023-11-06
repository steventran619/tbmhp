import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './Routes/AuthRoute.mjs';
import instagramImages from './Routes/MediaRoutes.mjs';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // to support JSON-encoded bodies
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})); // so the frontend can talk to the backend
app.use(cookieParser()); // Parse cookies for auth
app.use("/admin", authRoute); // Admin routes
app.use("/gallery", instagramImages); // Instagram routes)

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(PORT || 3000, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
    // dropCollection('media');
    // UpdateMediaInMongoDB();
    // main().catch(err => console.log(err));
});