import express from 'express';
import mongoose from 'mongoose';
import { Signup } from '../Controllers/NewsletterController.mjs';
import { userVerification } from '../Middlewares/AuthMiddleware.mjs';
import { createNewsletterSubscriberModel } from '../Models/NewsletterModel.mjs';

const mongodbNewsletterConnectString = process.env.MONGODB_NEWSLETTER_CONNECT_STRING;

// Connect to the newsletter database
const newsletterConn = mongoose.createConnection(mongodbNewsletterConnectString);
const NewsletterSubscriber = createNewsletterSubscriberModel(newsletterConn);

const router = express.Router();

router.post('/signup', (req, res, next) => Signup(NewsletterSubscriber, req, res, next));
// router.post('/verify/:token', (req, res, next) => Login(NewsLetterSubscriber, req, res, next));

export default router;