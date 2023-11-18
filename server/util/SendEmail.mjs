import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendEmail(email, subject, message) {
  const mailConfigurations = { 
    // It should be a string of sender/server email 
    from: 'dillonodle@gmail.com', 
  
    to: email, 
  
    // Subject of Email 
    subject: subject, 
      
    // Text of email body 
    html: message   
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEWSLETTER_EMAIL,
      pass: process.env.NEWSLETTER_PASSWORD
    }
  });
  let info = await transporter.sendMail(mailConfigurations, function(error, info){
    if (error) {
      console.error('Error occurred. ' + error.message);
      return process.exit(1);
    }
  });
  console.log('Email Sent Successfully');
}

export { sendEmail }




  
