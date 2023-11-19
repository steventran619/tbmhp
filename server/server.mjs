import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './Routes/AuthRoute.mjs';
import newsletterRoute from './Routes/NewsletterRoute.mjs';
import instagramImages from './Routes/MediaRoutes.mjs';
import { UpdateMedia } from './Controllers/InstagramController.mjs';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "http://127.0.0.1:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080/tbmhp",
        "http://localhost:5173", 
        "http://localhost:5173/tbmhp", 
        "http://localhost:8080", 
        "http://localhost:8080/tbmhp", 
        "https://steventran619.github.io/tbmhp"
    ],
    // origin: [
    //     "*"
    // ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
// })); // so the frontend can talk to the backend
app.use(express.json());  // to support JSON-encoded bodies
// app.use(cors());

app.use(cookieParser()); // Parse cookies for auth
app.use("/admin", authRoute); // Admin routes
app.use("/newsletter", newsletterRoute); // Admin routes
app.use("/gallery", instagramImages); // Instagram routes)

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(PORT || 3000, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
    // dropCollection('media');
    // UpdateMedia();
    // main().catch(err => console.log(err));
});