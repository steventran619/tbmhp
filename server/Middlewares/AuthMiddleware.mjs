import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { createUserModel } from '../Models/AdminModel.mjs';

const mongodbAdminConnectString = process.env.MONGODB_ADMIN_CONNECT_STRING;
const adminConn = mongoose.createConnection(mongodbAdminConnectString);
const User = createUserModel(adminConn);

export const userVerification = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.json({ status: false, message: "No token provided" }); 
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Failed to authenticate token" }); // Forbidden
    } 

    try {
      const user = await User.findById(data.id);
      // console.log("-----")
      // console.log(user);
      if (user) {
        return res.json({ status: true, user: user.username })
      } else {
        return res.json({ status: false, message: "User not found" }); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Internal Server Error" }); 
    }
  });
};