import { createSecretToken } from '../util/SecretToken.mjs';
import { sendEmail } from '../util/SendEmail.mjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export async function Signup(NewsletterSubscriber, req, res, next) {
  try {
    const { email, firstname, lastname } = req.body;

    if (!(email && firstname && lastname)) {
        return res.json({message: "Missing Required Field"});
    }
    if (!(validator.isEmail(email))) {
      return res.json({message: "Invalid Email"});
    }
    
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });
    let subscriber;
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

export async function Verify(NewsletterSubscriber, token) {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const subscriber = await NewsletterSubscriber.findByIdAndUpdate(decoded.id, { active: true }, { new: true });

    if (!subscriber) {
      throw new Error('Subscriber not found');
    }

    return { success: true };
  } catch (error) {
    // Log the error and rethrow it
    console.error(error);
    throw error;
  }
}