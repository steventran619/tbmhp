import { createSecretToken } from '../util/SecretToken.mjs';
import { sendVerification } from '../util/NewsletterTokenSender.mjs';
import bcrypt from 'bcrypt';

export async function Signup(NewsletterSubscriber, req, res, next) {
  try {
    const { email, firstname, lastname } = req.body;
    let subscriber;

    if (!(email && firstname && lastname)) {
        return res.json({message: "Missing Required Field"});
    }

    const existingSubscriber = await NewsletterSubscriber.findOne({ email });

    // If the user has an active account (already verified, return)
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.json({ message: "This email is already subscribed" });
      } else {
        subscriber = existingSubscriber;
      }
    } else {
      subscriber = await NewsletterSubscriber.create({ email, firstname, lastname });
    }

    const token = createSecretToken(subscriber._id);

    sendVerification(firstname, email, token)
    .then(() => {
      res.status(201).json({ message: "Verification Email Sent", success: true, subscriber });
    })
    .catch(err => {
      console.error('An error occurred: ', err);
    })
    

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Internal Server Error
  }
}