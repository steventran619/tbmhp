import express from 'express';
import mongoose from 'mongoose';
import { Signup, Login } from '../Controllers/AuthController.mjs';
import { userVerification } from '../Middlewares/AuthMiddleware.mjs';
import { createUserModel } from '../Models/AdminModel.mjs';

const mongodbAdminConnectString = process.env.MONGODB_ADMIN_CONNECT_STRING;

// Connect to the admin database
const adminConn = mongoose.createConnection(mongodbAdminConnectString);
const User = createUserModel(adminConn);

const router = express.Router();

router.post('/signup', (req, res, next) => Signup(User, req, res, next));
router.post('/login', (req, res, next) => Login(User, req, res, next));

router.post('/', userVerification, (req, res) => {
    res.json({ message: "User verified successfully!" });
});

export default router;