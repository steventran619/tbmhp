import express from 'express';
import mongoose from 'mongoose';
import { Signup, Unsubscribe, Verify, SendUnsubscribeToken } from '../Controllers/NewsletterController.mjs';
import { createNewsletterSubscriberModel } from '../Models/NewsletterModel.mjs';

const mongodbNewsletterConnectString = process.env.MONGODB_NEWSLETTER_CONNECT_STRING;

// Connect to the newsletter database
const newsletterConn = mongoose.createConnection(mongodbNewsletterConnectString);
const NewsletterSubscriber = createNewsletterSubscriberModel(newsletterConn);

const router = express.Router();

router.post('/signup', async (req, res, next) => Signup(NewsletterSubscriber, req, res, next));

router.get('/verify/:token', async (req, res) => {
  try {
    const result = await Verify(NewsletterSubscriber, req.params.token);
    if (result.success) {
      res.redirect(`${process.env.APP_BASE_URL}/newsletter-success`);
    }
  } catch (error) {
    const message = error.message;
    res.redirect(`${process.env.APP_BASE_URL}/newsletter-failure?message=${encodeURIComponent(message)}`);
  }
});

router.post('/unsubscribe', async (req, res, next) => SendUnsubscribeToken(NewsletterSubscriber, req, res, next));

router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const result = await Unsubscribe(NewsletterSubscriber, req.params.token);
    if (result.success) {
      res.redirect(`${process.env.APP_BASE_URL}/unsubscribe-success`);
    }
  } catch (error) {
    const message = error.message;
    res.redirect(`${process.env.APP_BASE_URL}/unsubscribe-failure?message=${encodeURIComponent(message)}`);
  }
});

export default router;