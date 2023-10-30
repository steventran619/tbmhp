import { Signup } from '../Controllers/AuthController.mjs';
import express from 'express';
import { createUserModel } from '../Models/AdminModel.mjs';
import mongoose from 'mongoose';

const mongodbAdminConnectString = process.env.MONGODB_ADMIN_CONNECT_STRING;

// Connect to the admin database
const adminConn = mongoose.createConnection(mongodbAdminConnectString);
const User = createUserModel(adminConn);

const router = express.Router();

router.post('/signup', (req, res, next) => Signup(User, req, res, next));

export default router;