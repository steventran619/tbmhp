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
    if (existingSubscriber && existingSubscriber.active) {
      return res.json({ message: "This email is already subscribed" });
    }

    subscriber = existingSubscriber || await NewsletterSubscriber.create({ email, firstname, lastname });


    // Create jwt token to send with email
    const jwtExpireTime = 3 * 24 * 60 * 60;
    const token = createSecretToken({id: subscriber._id, email: email}, jwtExpireTime);
    
    // Send email
    const verificationUrl = `${process.env.SERVER_BASE_URL}/newsletter/verify/${token}`;
    const verificationSubject = 'TBMHP Newsletter Verification'
    const verificationMessage = `
      <h1>Hi ${firstname}</h1>
      <p>Thank you for subscribing to our newsletter. 
        Please follow the <a href="${verificationUrl}">Link</a> to verify your email.</p>
      <p>TBMHP Team</p>
      `;
    
    await sendEmail(email, verificationSubject, verificationMessage);
    res.status(201).json({ message: "Verification Email Sent", success: true, subscriber });
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
    const email = decoded.email;
    const subscriber = await NewsletterSubscriber.findByIdAndUpdate(decoded.id, { active: true }, { new: true });

    if (!subscriber) {
      throw new Error('Subscriber not found');
    }

        // Create jwt token (expires in 1 year) to send for unsubscription email
    const jwtExpireTime = 365 * 24 * 60 * 60;
    const unsubscribeToken = createSecretToken({id: subscriber._id, email: subscriber.email}, jwtExpireTime);
    
    // Send confirmation email
    const unsubscribeUrl = `${process.env.SERVER_BASE_URL}/newsletter/unsubscribe/${unsubscribeToken}`;
    const confirmationSubject = 'TBMHP Newsletter Confirmation'
    const confirmationMessage = `
      <h1>Welcome!</h1>
      <p>Thank you for subscribing to the TBMHP newsletter. Your subscription is now confirmed.</p> 
        
      <p>If you would like to unsubscribe, please follow this <a href="${unsubscribeUrl}">Link</a>.</p>
      <p>TBMHP Team</p>
      `;
    
    await sendEmail(email, confirmationSubject, confirmationMessage);

    return { success: true };
  } catch (error) {
    // Log the error and rethrow it
    console.error(error);
    throw error;
  }
}

    return { success: true };
  } catch (error) {
    // Log the error and rethrow it
    console.error(error);
    throw error;
  }
}