import { createSecretToken } from '../util/SecretToken.mjs';
import { sendVerification } from '../util/NewsletterTokenSender.mjs';
import jwt from 'jsonwebtoken';

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

export async function Verify(NewsletterSubscriber, req, res, next) {
    const token = req.params.token;
    if (!token) {
      return res.json({ status: false, message: "No token provided"});
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        console.log(err)
        return res.json({ status: false, message: "Failed to authenticate token" }); // Forbidden
      } 

      try {
        const subscriber = await NewsletterSubscriber.findByIdAndUpdate(data.id, {active: true }, {new: true})
        if (subscriber) {
          return res.json({ status: true, message: "Subscriber is active"});
        } else {
          return res.json({ status: false, message: "Subscriber not found" }); 
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" }); 
      }
    });
}