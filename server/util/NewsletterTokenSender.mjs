import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// const token = jwt.sign({
//     data: 'Token Data'
//   }, process.env.TOKEN_KEY, { expiresIn: '10m' }
// );






async function sendVerification(firstname, email, token) {
  const verificationTemplate = `
  <h1>Hi ${firstname}</h1>
  <p>Thank you for subscribing to our newsletter. 
           Please follow the given link to verify your email 
           http://localhost:3000/newsletter/verify/${token} 
  </p>
  <p>TBMHP Team</p>
           
  `;


  const mailConfigurations = { 
    // It should be a string of sender/server email 
    from: 'dillonodle@gmail.com', 
  
    to: email, 
  
    // Subject of Email 
    subject: 'Email Verification', 
      
    // This would be the text of email body 
    html: verificationTemplate   
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

export { sendVerification }




  
