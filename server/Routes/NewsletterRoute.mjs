import express from 'express';
import mongoose from 'mongoose';
import { Signup, Verify } from '../Controllers/NewsletterController.mjs';
import { createNewsletterSubscriberModel } from '../Models/NewsletterModel.mjs';

const mongodbNewsletterConnectString = process.env.MONGODB_NEWSLETTER_CONNECT_STRING;

// Connect to the newsletter database
const newsletterConn = mongoose.createConnection(mongodbNewsletterConnectString);
const NewsletterSubscriber = createNewsletterSubscriberModel(newsletterConn);

const router = express.Router();

router.post('/signup', (req, res, next) => Signup(NewsletterSubscriber, req, res, next));
router.get('/verify/:token', (req, res, next) => Verify(NewsletterSubscriber, req, res, next));

export default router;